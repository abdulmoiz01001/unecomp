"use server";
import { generateResetPasswordToken } from "@/lib/token";

const emailResetAction = async (email : string) =>{
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user?user=${email}`, {
        method: 'GET',
      });
  
      if (!res.ok) {
        
        return { error: "Invalid email"};
      }
  
      const resetPasswordToken =  await generateResetPasswordToken(email);

      const send = await fetch(`${process.env.NEXTAUTH_URL}/api/resetpasswordtokenmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetPasswordToken }),
      });

        if (!send.ok) {
            return { error: "Invalid email"};
        }

        return { success: "Email sent"};
        
}

export default emailResetAction;