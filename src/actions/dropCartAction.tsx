"use server";
const dropCartAction = async (userID : any) => {
    try {
        console.log('userID:', userID);
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cart?user=${userID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error('Failed to drop cart');
            return { message: 'Failed to drop cart' };
        }

        let data;
        try {
            data = await res.json();
        } catch (e) {
            console.log('No JSON response body');
            data = { message: 'No response body' };
        }

        console.log('Data:', data);
        return data; // Return the data received from the API
    } catch (error) {
        console.log('Error in dropCartAction:', error);
        return { message: 'Failed to drop cart' };
    }
}

export default dropCartAction;
