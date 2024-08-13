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


// export const generateResetPasswordToken = async (email: string) => {
//     const resetPasswordToken = uuidv4();

//     const getResetPasswordToken  = await fetch(`${process.env.NEXTAUTH_URL}/api/resetpasswordtoken?resetpasswordtoken=${resetPasswordToken}`);
//     if(getResetPasswordToken){
//      const deleteToken = await fetch(`${process.env.NEXTAUTH_URL}/api/resetpasswordtoken?resetpasswordtoken=${resetPasswordToken}`, {
//             method: 'DELETE'
//         });
//         console.log(deleteToken);
    
//     }

//     const NewToken = await fetch(`${process.env.NEXTAUTH_URL}/api/resetpasswordtoken`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, resetPasswordToken })
//     });

//     return resetPasswordToken;
// }

export const generateResetPasswordToken = async (email: string) => {
    const resetPasswordToken = uuidv4();

    const baseURL = process.env.NEXTAUTH_URL || "http://localhost:3000";
    if (!baseURL) {
        throw new Error('NEXTAUTH_URL environment variable is not defined');
    }

    console.log("Base URL:", baseURL);

    const getResetPasswordToken = await fetch(`${baseURL}/api/resetpasswordtoken?resetpasswordtoken=${resetPasswordToken}`);
    if (getResetPasswordToken) {
        const deleteToken = await fetch(`${baseURL}/api/resetpasswordtoken?resetpasswordtoken=${resetPasswordToken}`, {
            method: 'DELETE'
        });
        console.log(deleteToken);
    }

    const NewToken = await fetch(`${baseURL}/api/resetpasswordtoken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, resetPasswordToken })
    });

    return resetPasswordToken;
}
