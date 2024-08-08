"use server";

const ordersAction = async (userID: string) => {
    try{
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/orders?id=${userID}`,{
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
    
export default ordersAction;