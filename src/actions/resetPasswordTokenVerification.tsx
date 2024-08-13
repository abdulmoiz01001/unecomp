"use server"

const resetPasswordTokenVerification = async (resetPasswordToken : string | null , password : string) =>{


    try{
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/resetpasswordtoken?resetpasswordtoken=${resetPasswordToken}`, {
            method: 'GET',

          });
      
          if (!res.ok) {
            return { error: "Invalid token"};
          }

          const newPassword = await fetch(`${process.env.NEXTAUTH_URL}/api/resetpasswordtoken`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resetPasswordToken, password }),
            });

            if (!newPassword.ok) {
                return { error: "Invalid token"};
            }
               
      
            return { success: "Password reset"};
    }catch(e){
        console.log("This is an error in resetPasswordTokenVerification :: " , e);
        return { error: "Invalid token"};
    }
    

}

export default resetPasswordTokenVerification;