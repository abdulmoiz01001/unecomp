import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/lib/modals/user";



export const GET = async (req: Request) => {
    await connectDB();
    const url = new URL(req.url);
    console.log(url);
    // const body = await req.json();
    // console.log(body);
    const token = url.searchParams.get('token');
    

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
    const token = url.searchParams.get('token');
    const user = await User
        .findOneAndDelete({ token });
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });
}

export const PUT = async (req: Request) => {
    await connectDB();
    const url = new URL(req.url);
    // console.log(url);
    const token = url.searchParams.get('token');

    // const body = await req.json();
    const user = await User
        .findOneAndUpdate({ token }, { verified: true }, { new: true });
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });
}

export const POST = async (req: Request) => {
    await connectDB();
    const body = await req.json();
    console.log(body);
    const user = await User.findOneAndUpdate({ email: body.email }, body);
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });
}