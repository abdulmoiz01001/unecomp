import { NextResponse, userAgentFromString } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/modals/user";



export const GET = async (req: Request) => {
   
    try{
        const url = new URL(req.url);
        const data = url.searchParams.get('data');
        if(data){
            const users = await User.find();
            console.log('Users:', users);
            return new NextResponse(JSON.stringify(users), { status: 200 });
        }
        await connectDB();
        const users = await User.find({
        verified: true
        }).countDocuments();
        console.log('Users:', users);
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error to get users' }), { status: 500 });
    }   
}
