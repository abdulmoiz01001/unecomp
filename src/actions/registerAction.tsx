"use server"
import { generateToken } from "@/lib/token"; // Import the generatePasswordResetToken function\
import bycrpt from "bcryptjs";
const registerAction = async (values: any) => {
  try {
    // get user from db by email

    console.log("enterd in register action")
    console.log(values);

    console.log(process.env.NEXTAUTH_URL);

    const getUser = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("fetched user data" , getUser)
    console.log("fetched user data")

    getUser.json().then((data) => {
      console.log(data);
      data.map((user: any) => {
        if (user.email === values.email) {
          console.log("User Already Exists");
          return { message: "User Already Exists"}
        }
      });
    });

    console.log("configured duplicate user")

    const hasspasswod = await bycrpt.hash(values.password, 12);
    values.password = hasspasswod;
    
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      console.log("error in creating user")
      return { message: "An error occurred during creating user"};
    }
    console.log("user created")

    console.log("its response" ,res);
    const token = await generateToken(values.email); // Use the generatePasswordResetToken function

    if (!token) {
      console.log("error in generating token")
      return { message: "An error occurred during token generation"};
    }
    console.log("token generated")
    const sendMail = await fetch(`${process.env.NEXTAUTH_URL}/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, email: values.email , username: values.username}),
    });

    if (!sendMail.ok) {
      console.log("error in sending mail")
      return { message: "An error occurred during sending mail"};
    }

console.log("sendMail Data cleared")
  
    console.log("response returned")
    console.log(res);
    
    return { message: "Confirmation mail is sent to you please check your inbox as well as junk mails" };
  } catch (error) {
    console.log("Not Connected" , error);
    return { message: "An error occurred during login"};
  }
};

export default registerAction;
