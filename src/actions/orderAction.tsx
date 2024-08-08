"use server";
import getUserByEmailAction from "./getUserByEmailAction";



const orderAction = async (userID : string , parsedProduct : any  , userDetails : any , city : string , deliveryAddress : string , cashOnDelivery : Boolean) => {
  try{

    if (!parsedProduct || !Array.isArray(parsedProduct)) {
      throw new Error("Invalid product data");
    }

    const totalPrice = await parsedProduct.reduce((acc, item) => {
      return acc + (item.productPrice * item.productQuantity);
    }, 0);
    
    // console.log('User Email:', userEmail);

    // if(!userEmail){
    //     return {message: 'User Email is not defined'};
    // }
  
    // const getUser = await getUserByEmailAction(userEmail)
    
    // if(!getUser.ok){
    //    return {message: 'Failed to fetch user data'};
    // }
    
    // console.log('User:', getUser);
    // const userData = await getUser.json();

    const order = {
        orderItems: parsedProduct.map((item : any) => ({
          productName: item.productName,
          productQuantity: item.productQuantity,
          productImage: item.fileURL,
          productPrice: item.productPrice,
          product: item._id,
        })),
        shippingAddress: {
          address: deliveryAddress,
          city: city,
          country: userDetails.country || 'Pakistan',
        },
        cashOnDelivery: cashOnDelivery,
        shippingPrice: "200",
        totalPrice: totalPrice.toString(),
        user: userID,
        customerDetails: userDetails,
        isPaid: false,
        isDelivered: false,
        adminApprove: "Order will Approved as soon possible",
        orderDate: new Date(),
        orderTime: new Date().toLocaleTimeString(),
      };

      console.log('Order:', order);

      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });


      if(!res.ok){
         return {message: 'Failed to create order'};
      }

    //   console.log('Order:', order);
    return { message: 'Order placed successfully'}
    }catch(error){
       return {message: 'Error to create order'};
    }


}

export default orderAction;