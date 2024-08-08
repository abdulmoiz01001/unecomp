"use server";
import getUserByEmailAction from "./getUserByEmailAction";

const cartOrderAction = async(userID : string , cartProducts : any  , userDetails : any , city : string , deliveryAddress : string , cashOnDelivery : Boolean ) => {
 try{

     if (!cartProducts || !Array.isArray(cartProducts)) {
         throw new Error("Invalid product data");
    }

// if(!userEmail){
//         return {message: 'User Email is not defined'};
//     }

    
    // const getUser = await getUserByEmailAction(userEmail);
    // if(!getUser.ok){
    //    return {message: 'Failed to fetch user data'};
    // }
    
    // console.log('User:', getUser);
    // const userData = await getUser.json();


    // console.log('User Email:', userEmail);
    console.log('Cart Products:', cartProducts);
    console.log('User Details:', userDetails);
    console.log('City:', city);
    console.log('Delivery Address:', deliveryAddress);
    console.log('Cash on Delivery:', cashOnDelivery);
    // console.log('Total Price:', totalPrice);


 
    const orderPromises = cartProducts.map(async (item) => {
        console.log('Product:', item);

        const totalPrice = item.productPrice * item.productQuantity;

        const order = {
          orderItems: {
            productName: item.productName,
            productQuantity: item.productQuantity,
            productImage: item.fileURL,
            productPrice: item.productPrice,
            product: item.productID,
          },
          shippingAddress: {
            address: deliveryAddress,
            city: city,
            country: userDetails.country || 'Pakistan',
          },
          cashOnDelivery: cashOnDelivery,
          shippingPrice: "200 (once for all products)",
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
  
        if (!res.ok) {
          throw new Error('Failed to create order');
        }
  
        return res.json(); // or handle the response as needed
      });
  
      await Promise.all(orderPromises);


   return { message: 'Order placed successfully'}

   }catch(error){
         console.log('Error in orderAction:', error);
         return {message: 'Failed to place order'};
    }


}




export default cartOrderAction;