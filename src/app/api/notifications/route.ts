import connectDB from "@/lib/db";
import Notification from "@/backend/src/models/Notification";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const today = url.searchParams.get('today');
        if(today){
            try{

                await connectDB();
                const notifications = await Notification.find({ createdAt: { $gte: new Date(new Date().setHours(0o0, 0o0, 0o0)), $lt: new Date(new Date().setHours(23, 59, 59)) }});
                return new NextResponse(JSON.stringify(notifications), { status: 200 });
            }catch(error){
                return new NextResponse(JSON.stringify(null), { status: 200 });
            }
        }
        await connectDB();
        const notifications = await Notification.find({});
        return new NextResponse(JSON.stringify(notifications), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 200 });
    }
}