import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/lib/modals/orders";

export const GET = async (req: NextRequest) => {
  await connectDB();
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  const requestType = url.searchParams.get('reqType');
  console.log('User ID:', userId);
  console.log('Request Type:', requestType);

  if (!userId || !requestType) {
    return new NextResponse('Missing userId or reqType parameter', { status: 400 });
  }

  try {
    let responseData: any = "no condition matched";

    if (requestType === 'ordershipingdetails') {
      const recentOrder = await Order.findOne({ user: userId }).sort({ orderDate: -1 });
      if (!recentOrder || !recentOrder.shippingAddress) {
        return new NextResponse(JSON.stringify(null), { status: 200 });
      }
      console.log('Recent Order:', recentOrder);
      console.log('Recent Order Shipping Address:', recentOrder.shippingAddress);
      return new NextResponse(JSON.stringify(recentOrder.shippingAddress), { status: 200 });

    } else if (requestType === 'totalinvestment') {
      const orders = await Order.find({ user: userId });
      let totalInvestment: number = 0;
      orders.forEach((order) => {
        if (order.isDelivered) {
          totalInvestment += parseFloat(order.totalPrice);
        }
      });
      console.log('Total Investment:', totalInvestment);
      return new NextResponse(JSON.stringify(totalInvestment), { status: 200 });

    } else if (requestType === 'recentorderdetails') {
      const recentOrder = await Order.findOne({ user: userId }).sort({ orderDate: -1 });
      if (!recentOrder) {
        return new NextResponse(JSON.stringify(null), { status: 200 });
      }
      console.log('Recent Order:', recentOrder);
      return new NextResponse(JSON.stringify(recentOrder), { status: 200 });

    } else if (requestType === 'orderstatus') {
      const orders = await Order.find({ user: userId });
      const status = {
        pending: orders.filter(order => order.adminApprove.includes('Order will Approved as soon possible')).length,
        rejected: orders.filter(order => order.adminApprove.includes('Your Order is not Approved due to unavailable Stock.')).length,
        accepted: orders.filter(order => order.adminApprove.includes('Your Order is Approved it will be delivered soon.')).length,
        delivered: orders.filter(order => order.isDelivered).length,
      };
      console.log('Order Status:', status);
      return new NextResponse(JSON.stringify(status), { status: 200 });

    } else {
      return new NextResponse('Invalid reqType parameter', { status: 400 });
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    return new NextResponse('Server error', { status: 500 });
  }
};
