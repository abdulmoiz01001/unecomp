import Product from "@/lib/modals/product";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export const GET = async (req :Request) => {
    try {
        await connectDB();
        const url = new URL(req.url);
        const category = url.searchParams.get('category');
        if (!category) {
            return new NextResponse(JSON.stringify({ message: 'Categories parameter is missing' }), { status: 400 });
        }

        const products = await Product.find({ productCategory: category });

        if (!products) {
            return new NextResponse(JSON.stringify({ message: 'Products not found' }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({message: 'Error to get products'}), { status: 500});
    }
}
