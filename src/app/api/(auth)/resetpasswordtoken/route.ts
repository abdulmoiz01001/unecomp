import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/lib/modals/user";
import bycrpt from "bcryptjs";

export const GET = async (req: Request) => {
    await connectDB();
    const url = new URL(req.url);
    console.log(url);
    // const body = await req.json();
    // console.log(body);
    const token = url.searchParams.get('resetpasswordtoken');
    

    const user = await User.findOne({ token });
    console.log(user);
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }));
    }
    return new NextResponse(JSON.stringify(user));
}

export const DELETE = async (req: Request) => {
    await connectDB();
    const url = new URL(req.url);
    console.log(url);
    const token = url.searchParams.get('resetpasswordtoken');
    const user = await User
        .findOneAndDelete({ token });
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }));
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });
}

export const POST = async (req: Request) => {
    await connectDB();
    const body = await req.json();
    console.log(body);
    const user = await User.findOne({ email: body.email });
    user.resetPasswordToken = body.resetPasswordToken;
    // user.resetPasswordExpires = body.resetPasswordExpires;
    await user.save();

    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });
}

export const PUT = async (req: Request) => {
    await connectDB();
    const body = await req.json();
    console.log(body);
    const user = await User.findOne({ resetPasswordToken: body.resetPasswordToken });
    console.log(user);
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    const hash = await bycrpt.hash(body.password, 10);

    user.password = hash;
    user.resetPasswordToken = null;
   
    await user.save();
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });

}

