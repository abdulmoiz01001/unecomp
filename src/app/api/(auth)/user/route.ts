import connectDB from "@/lib/db";
import User from "@/lib/modals/user";
import { useRangeSlider } from "@chakra-ui/react";
import { NextResponse } from "next/server";

export const GET = async (req : Request) =>{
    try {
        await connectDB();
        const url = new URL(req.url);
        const email = url.searchParams.get('user');
        if (!email) {
            return new NextResponse(JSON.stringify({ message: 'Email parameter is missing' }), { status: 400 });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }
        console.log(user);
        return new NextResponse(JSON.stringify(user), { status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({message: 'Error fetching users'}), { status: 500});
    }
}