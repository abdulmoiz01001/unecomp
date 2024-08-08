"use server";
import getUserByEmailAction from "./getUserByEmailAction";


const removeCartAction = async (productID: string , userID: string) => {

    try{
        console.log('Product ID:', productID);

        // console.log('Email:', email);

        // const user = await getUserByEmailAction(email);

        // const userID = await user.json();

        // console.log('User ID:', userID._id);

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/onecart`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({_id: productID, userID: userID})
        });



        if(!res.ok){
            console.error('Failed to remove cart');
            return;
        }

        const data = await res.json();

        console.log('Data:', data);

        return data;

    }catch(error){
        console.error("Failed to remove cart");
    }




}

export default removeCartAction;