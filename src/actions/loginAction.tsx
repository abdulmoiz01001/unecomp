"use server"
import { signIn } from "@/auth";
import { generateToken } from "@/lib/token";
import bcrypt from "bcryptjs";
import getUserByEmailAction from "./getUserByEmailAction";

const loginAction = async (email: string, password: string) => {
    try {
        console.log("login action called");
        console.log(process.env.NEXTAUTH_URL);
      
        console.log(email + " " + password);

        if (!email) {
            console.log("Email is not defined");
            return { message: "Email is not defined" };
        }
        if (!password) {
            console.log("Password is not defined");
            return { message: "Password is not defined" };
        }

        const res : any = await getUserByEmailAction(email);

        if (!res.ok) {
            const errorData = await res.json();
            return { message: "Invalid Email" };
        }

        const data = await res.json();
        console.log("This is response data:", data);
        const verified = data.verified;
        console.log("This is verified:", verified);

        if (!verified) {
            console.log("User not verified");

            // Assuming generateToken function generates a verification token
            const token = await generateToken(email);
            
            // Use process.env.NEXTAUTH_URL to construct the correct endpoint
            const sendMail = await fetch(`${process.env.NEXTAUTH_URL}/api/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: token, email }),
            });

            

            if (!sendMail.ok) {
                return { message: "Failed to send email" };
            }

            return { message: "User not verified" };
        }

        if (!data.password) {
            console.log("Password is required");
            return { message: "Password is required!" };
        }

        const match = await bcrypt.compare(password, data.password);

        if (!match) {
            console.log("Password is incorrect");
            return { message: "Password is incorrect" };
        }

        console.log("Everything is correct");

        try {
            console.log("Trying to sign in");
            await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            console.log("Successfully signed in");
            return { message: "User logged in" };
        } catch (e) {
            console.error("Error signing in:", e);
            return { message: "User not logged in" };
        }
    } catch (e) {
        console.error("Login action error:", e);
        return { message: "An error occurred during login" };
    }
};

export default loginAction;
