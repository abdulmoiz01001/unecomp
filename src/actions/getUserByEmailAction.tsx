
"use server"
const getUserByEmailAction = (email: string) => {
    try{

        return fetch(`${process.env.NEXTAUTH_URL}/api/user?user=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch(e){
        console.log("This is an error in getUserByEmailAction :: " , e);
        return { error: "Invalid email"};
    }
}

export default getUserByEmailAction;