"use server";

const getOrderByIdAction = async (orderId: string) => {
    try{
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/orders?orderId=${orderId}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          
          })

          return res.json();
    }   catch (error) {
        console.error('Error:', error);
      }
}

export default getOrderByIdAction;