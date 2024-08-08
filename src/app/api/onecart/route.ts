import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Cart from "@/lib/modals/cart";
import mongoose from 'mongoose';

export const DELETE = async (req: Request) => {
    try {
         const body = await req.json();
        console.log('Request Body:', body);
        const { _id, userID } = body;
        console.log('Product ID:', _id);
        console.log('User ID:', userID);
        await connectDB();
        const cart = await Cart.findOneAndDelete({ productID: _id , user: userID });
        console.log('Cart:', cart);
        return new NextResponse(JSON.stringify(cart), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error to delete cart' }), { status: 500 });
    }
}