import { v4 as uuidv4 } from "uuid";

export const generateToken = async (email: string) => {
    const token = uuidv4();

    const Token  = await fetch(`${process.env.NEXTAUTH_URL}/api/token?email=${token}`);
    if(Token){
     const deleteToken = await fetch(`${process.env.NEXTAUTH_URL}/api/token/token=${token}`, {
            method: 'DELETE'
        });
        console.log(deleteToken);
    }


    const NewToken = await fetch(`${process.env.NEXTAUTH_URL}/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, token })
    });
    return token;
}