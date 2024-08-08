import { NextResponse, userAgentFromString } from "next/server";
import connectDB from "@/lib/db";
import Cart from "@/lib/modals/cart";
import mongoose from 'mongoose';

function isValidObjectId(id: string) {
    return mongoose.Types.ObjectId.isValid(id) && new mongoose.Types.ObjectId(id).toString() === id;
  }

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const count = url.searchParams.get('count');
        const user = url.searchParams.get('user');
        console.log('ID:', id);
        console.log('Count:', count);
        console.log('User:', user);
        if(count && user && !id){
            await connectDB();
        
            const objectId = new mongoose.Types.ObjectId(user);
            const carts = await Cart.find().countDocuments({ user: objectId});
            console.log('Carts:', carts);
            return new NextResponse(JSON.stringify(carts), { status: 200 });
        }

        if (!id && !count) {
            try{
            await connectDB();
            // const carts = await Cart.findOne({ cartItems: { _id: id }});
            // const objectId = new mongoose.Types.ObjectId(id);
            const carts = await Cart.find();
            console.log('count carts Carts:', carts);
            return new NextResponse(JSON.stringify(carts), { status: 200 });
        } catch (error) {
            console.error('Error:', error);
            return new NextResponse(JSON.stringify({ message: 'Error to get carts' }), { status: 500 });
        }
        }

        if(id && !count && !user){
            try{
                console.log('here entered in id and ! count');
                if (!isValidObjectId(id)) {
                    return new NextResponse(JSON.stringify({ message: 'Invalid ID format' }), { status: 400 });
                  }

                await connectDB();
                // const carts = await Cart.findOne({ cartItems: { _id: id }});
                const objectId = new mongoose.Types.ObjectId(id);
                const carts = await Cart.find({ user: objectId });
                console.log('user id Carts:', carts);
                return new NextResponse(JSON.stringify(carts), { status: 200 });
            }catch(error){
                console.error('Error:', error);
                return new NextResponse(JSON.stringify({ message: 'Error to get carts' }), { status: 500 });
            }
        }

        if(id && !count && user){
            try{
                console.log('here entered in id and ! count and cart');
                if (!isValidObjectId(id)) {
                    return new NextResponse(JSON.stringify({ message: 'Invalid ID format' }), { status: 400 });
                  }
                  if (!isValidObjectId(user)) {
                    return new NextResponse(JSON.stringify({ message: 'Invalid ID format' }), { status: 400 });
                  }

                await connectDB();
                // const carts = await Cart.findOne({ cartItems: { _id: id }});
                const objectId = new mongoose.Types.ObjectId(id);
                const userID = new mongoose.Types.ObjectId(user);
                const carts = await Cart.find({ productID: objectId , user: userID});
                console.log('user id Carts:', carts);
                return new NextResponse(JSON.stringify(carts), { status: 200 });
            }catch(error){
                console.error('Error:', error);
                return new NextResponse(JSON.stringify({ message: 'Error to get carts' }), { status: 500 });
            }
        }

        if (id && !count && !user) {
            try{
            console.log('here entered in id and ! count only id here');
            if (!isValidObjectId(id)) {
                return new NextResponse(JSON.stringify({ message: 'Invalid ID format' }), { status: 400 });
              }

            await connectDB();
            // const carts = await Cart.findOne({ cartItems: { _id: id }});
            const objectId = new mongoose.Types.ObjectId(id);
            const carts = await Cart.find({ user: objectId });
            console.log('user id Carts:', carts);
            return new NextResponse(JSON.stringify(carts), { status: 200 });
        }catch(error){
            console.error('Error:', error);
            return new NextResponse(JSON.stringify({ message: 'Error to get carts' }), { status: 500 });
        }
        }


        // await connectDB();
        // // const carts = await Cart.findOne({ cartItems: { _id: id }});
       
        // const carts = await Cart.find();
        // console.log('all Carts:', carts);
        // return new NextResponse(JSON.stringify(carts), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error to get carts' }), { status: 500 });
    }
}

export const POST = async (req: Request) => {
    try {
        await connectDB();
        const body = await req.json();
        console.log('Request Body:', body);
        const { productName , productCategory , fileURL , productID , productPrice , productQuantity , user, cartDate, cartTime } = body;

        console.log('ProdcutName', productName);
        console.log('ProductCategory:', productCategory);
        console.log('ProductID:', productID);
        console.log('ProductPrice:', productPrice);
        console.log('ProductQuantity:', productQuantity);
        console.log('FileURL:', fileURL);
        console.log('User:', user);
        console.log('Cart Date:', cartDate);
        console.log('Cart Time:', cartTime);

        if (!productName || !productCategory || !productPrice || !productQuantity || !fileURL || !user || !cartDate || !cartTime) {
            return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
        }

        const cart = new Cart(body);
        console.log('New Cart:', cart);

        await cart.save();

        return new NextResponse(JSON.stringify(cart), { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error to create cart' }), { status: 500 });
    }
}


export const DELETE = async (req : Request) => {
    try {
        await connectDB();
        const contentType = req.headers.get('content-type');
        if (contentType !== 'application/json') {
            return new NextResponse(JSON.stringify({ message: 'Content type must be application/json' }), { status: 400 });
        }

        // const body = await req.json();
        // console.log('Request Body:', body);
        // const { _id, user } = body;

        const url = new URL(req.url);
        const _id = url.searchParams.get('id');
        const user = url.searchParams.get('user');
        console.log('i am here for delete user carts');
        console.log('ID:', _id);
        console.log('User:', user);
        

        if (!_id && user ) {
            console.log('Entered in drop cart' , user);
            await Cart.deleteMany({ user: user });
            return new NextResponse(JSON.stringify({ message: 'Cart dropped successfully' }), { status: 200 });
        }

        if(_id && user){
            await Cart.deleteOne({ _id: _id , user: user });
            return new NextResponse(JSON.stringify({ message: 'Cart deleted successfully' }), { status: 200 });
        }

        // if (!_id && user) {
        //     await Cart.updateOne({ user: user }, { $set: { products: [] } });
        //     return new NextResponse(JSON.stringify({ message: 'All products deleted successfully' }), { status: 200 });
        // }
            
        if (_id !== null && !mongoose.Types.ObjectId.isValid(_id)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid ID' }), { status: 400 });
        }

        const cart = await Cart.findOneAndDelete({ _id: _id , user: user });
        if (!cart) {
            return new NextResponse(JSON.stringify({ message: 'Cart not found' }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(cart), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error deleting cart' }), { status: 500 });
    }
}
