import Product from "@/lib/modals/product";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";




export const GET = async (req : Request) => {
    await connectDB();
    const url = new URL(req.url);
    // const page : string | null = url.searchParams.get('page');
    // console.log('Page:', page);
    // const limit : number = 10;
    // const skip = (parseInt(String(page)) - 1) * limit;
    // console.log('Skip:', skip);
    const id = url.searchParams.get('id');
    const categories = url.searchParams.get('categories');
    console.log('ID:', id);
 if (id && categories) {
        try {
            const product = await Product.findOne({ _id: id, productCategory: categories });
            console.log('Product:', product);
            if (!product) {
                return new NextResponse(JSON.stringify({ message: 'Products not found' }), { status: 404 });
            }
            return new NextResponse(JSON.stringify(product), { status: 200 });
        
        }
        catch (error) {
            console.error('Error:', error);
            return new NextResponse(JSON.stringify({message: 'Error to get products'}), { status: 500});
        }
    }
    else{
        const products = await Product.find({});
        console.log('Products:', products);
        return new NextResponse(JSON.stringify(products), { status: 200 });
    }
    
 
}


export const POST = async (req: Request) =>{
    try {
        await connectDB();
        const body = await req.json();
        console.log('Request Body:', body);
       const { productName, productPrice, productDescription, productCategory, fileURL } = body;

       console.log('Product Name:', productName);
         console.log('Product Price:', productPrice);
            console.log('Product Description:', productDescription);
            console.log('Product Category:', productCategory);
            console.log('File URL:', fileURL);
            


        if (!productName || !productPrice || !productDescription || !productCategory || !fileURL) {
            return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
        }


        const product = new Product( body );
        console.log('New Product:', product);
    
        await product.save();
    
        return new NextResponse(JSON.stringify(product), { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({message: 'Error to create product'}), { status: 500});
    }
}


export const DELETE = async (req: Request) => {
    try {
        await connectDB();
        const url = new URL(req.url);
        const id = url.searchParams.get('id');


        if (!id) {
            return new NextResponse(JSON.stringify({ message: 'Product ID is required' }), { status: 400 });
        }

        const product = await Product.findByIdAndDelete({ _id: id });

        if (!product) {
            return new NextResponse(JSON.stringify({ message: 'Product not found' }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: 'Product removed' }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({message: 'Error to delete product'}), { status: 500});
    }
}