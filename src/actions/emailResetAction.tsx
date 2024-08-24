"use server";
import { generateResetPasswordToken } from "@/lib/token";

const emailResetAction = async (email : string) =>{
  try{

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user?user=${email}`, {
      method: 'GET',
    });
    
    if (!res.ok) {
      
      return { error: "Invalid email"};
    }
    
    console.log('Email:', email);
    console.log('User Response:', res);
    
    const resetPasswordToken =  await generateResetPasswordToken(email);
    
    console.log('Reset Password Token:', resetPasswordToken);
    
    const send = await fetch(`${process.env.NEXTAUTH_URL}/api/resetpasswordtokenmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, resetPasswordToken }),
    });
    
    console.log('Send:', send);
    
    if (!send.ok) {
      return { error: "Invalid email"};
    }
    
    return { success: "Email sent"};
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error: "An unexpected error occurred in sending email"};
  }
    
}

export default emailResetAction;