import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Orders from "@/lib/modals/orders";
import mongoose from "mongoose";


export const GET = async (req: Request) => {
    try {
        await connectDB();
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const orderId = url.searchParams.get('orderId');
        const count = url.searchParams.get('count');
        const orderCount = url.searchParams.get('orderCount');
        console.log('ID:', id);

        if(orderId){
            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return new NextResponse(JSON.stringify({ message: 'Invalid ID format' }), { status: 400 });
              }
            const order = await Orders.findById(orderId);
            console.log('Order:', order);
            if (!order) {
                return new NextResponse(JSON.stringify({ message: 'Order not found' }), { status: 404 });
            }
            return new NextResponse(JSON.stringify(order), { status: 200 });
        }
        if (!id) {
            const orders = await Orders.find().sort({ orderDate: 1 });
            console.log('Orders:', orders);
            if (!orders) {
                return new NextResponse(JSON.stringify({ message: 'Orders not found' }), { status: 404 });
            }
            if (!orders.length) {
                return new NextResponse(JSON.stringify({ message: 'Orders not found' }), { status: 404 });
            }
            return new NextResponse(JSON.stringify(orders), { status: 200 });
        }

        if (count && !id) {
            const orders = await Orders.find().countDocuments();
            console.log('Orders:', orders);
            return new NextResponse(JSON.stringify(orders), { status: 200 });
        }

       if (orderCount && !id) {
    const orders = await Orders.aggregate([
        {
            $match: { isDelivered: true }
        },
        {
            $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                totalPriceSum: { $sum: "$totalPrice" }
            }
        }
    ]);

    if (orders.length > 0) {
        const { totalOrders, totalPriceSum } = orders[0];
        console.log('Total Orders:', totalOrders);
        console.log('Total Price Sum:', totalPriceSum);
        return new NextResponse(JSON.stringify({ totalOrders, totalPriceSum }), { status: 200 });
    } else {
        return new NextResponse(JSON.stringify({ totalOrders: 0, totalPriceSum: 0 }), { status: 200 });
    }
}
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return new NextResponse(JSON.stringify({ message: 'Invalid ID format' }), { status: 400 });
        //   }
        // const objectId = new mongoose.Types.ObjectId(id);



        const orders = await Orders.find({ user: id });
        console.log('Orders:', orders);
        if (!orders) {
            return new NextResponse(JSON.stringify({ message: 'Orders not found' }), { status: 404 });
        }
        if (!orders.length) {
            return new NextResponse(JSON.stringify({ message: 'Orders not found' }), { status: 404 });
        }
        return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error to get orders' }), { status: 500 });
    }
}

export const PUT = async (req: Request) => {
    try {
        await connectDB();
        const contentType = req.headers.get('content-type');
        if (contentType !== 'application/json') {
            return new NextResponse(JSON.stringify({ message: 'Content type must be application/json' }), { status: 400 });
        }

        const body = await req.json();
        console.log('Request Body:', body);

        const { _id, adminApprove , isDelivered , isPaid } = body;
        console.log('ID:', _id);
        console.log('Is Delivered:', adminApprove);
        console.log('Is Paid:' , isPaid)

        // if(noDelivered){
        //     const order = await Orders.findByIdAndUpdate(_id, body , { new: true });
        //     order.isDelivered = false;
        //     order.isPaid = false;

        //     await order.save();

        //     return new NextResponse(JSON.stringify(order), { status: 200 });
        // }

        if(_id && isDelivered && isPaid){
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return new NextResponse(JSON.stringify({ message: 'Invalid ID format' }), { status: 400 });
            }

            const order = await Orders.findByIdAndUpdate(_id, body , { new: true });
            console.log('Order:', order);
            if (!order) {
                return new NextResponse(JSON.stringify({ message: 'Order not found' }), { status: 404 });
            }

            order.isDelivered = isDelivered;
            order.isPaid = isPaid

            await order.save();

            return new NextResponse(JSON.stringify(order), { status: 200 });


        }


        if (!_id && !isDelivered) {
            return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
        }
        if (!_id && !adminApprove) {
            return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
        }
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid ID format' }), { status: 400 });
        }
        const order = await Orders.findByIdAndUpdate(_id, body , { new: true });
        console.log('Order:', order);
        if (!order) {
            return new NextResponse(JSON.stringify({ message: 'Order not found' }), { status: 404 });
        }
        order.adminApprove = adminApprove;
        await order.save();
        return new NextResponse(JSON.stringify(order), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error to update order' }), { status: 500 });
    }
}

export const POST = async (req: Request) => {
    try {
        await connectDB();
        const body = await req.json();
        console.log('Request Body:', body);
        const { orderItems, shippingAddress, cashOnDelivery, shippingPrice, totalPrice, user } = body;

        console.log('Order Items:', orderItems);
        console.log('Shipping Address:', shippingAddress);
        console.log('Payment Method:', cashOnDelivery);
        console.log('Shipping Price:', shippingPrice);
        console.log('Total Price:', totalPrice);
        console.log('User:', user);

        if (!orderItems || !shippingAddress || !cashOnDelivery || !shippingPrice || !totalPrice || !user) {
            return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
        }

        const order = new Orders(body);
        console.log('New Order:', order);

        await order.save();

        return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error to create order' }), { status: 500 });
    }
}

export const DELETE = async (req: Request) => {
    try {
        await connectDB();
        const contentType = req.headers.get('content-type');
        if (contentType !== 'application/json') {
            return new NextResponse(JSON.stringify({ message: 'Content type must be application/json' }), { status: 400 });
        }

        const body = await req.json();
        console.log('Request Body:', body);
        const { _id , userID } = body;
        console.log('ID:', _id);
        console.log('User ID:', userID);
        if (!_id) {
            return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
        }
        if(!userID){
            return new NextResponse(JSON.stringify({ message: 'User ID is required' }), { status: 400 });
        }
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid ID format' }), { status: 400 });
        }
        // const order = await Orders.findByIdAndDelete(_id);
        const order = await Orders.findOneAndDelete({ _id, user: userID });
        console.log('Order:', order);
        if (!order) {
            return new NextResponse(JSON.stringify({ message: 'Order not found' }), { status: 404 });
        }
        return new NextResponse(JSON.stringify({ message: 'Order deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error to delete order' }), { status: 500 });
    }
}