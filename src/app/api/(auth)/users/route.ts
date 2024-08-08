import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/modals/user";

export const GET = async () =>{
    try {
        await connectDB();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), { status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({message: 'Error fetching users'}), { status: 500});
    }
}



export const POST = async (req: Request) =>{
    try {
        await connectDB();
        const body = await req.json();
        const user = new User(body);
        await user.save();
        return new NextResponse(JSON.stringify(user), { status: 201});
    } catch (error) {
        return new NextResponse(JSON.stringify({message: 'Error creating user'}), { status: 500});
    }
}
