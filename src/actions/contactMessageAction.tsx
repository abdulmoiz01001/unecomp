"use server";

const contactMessageAction = async (values: any) => {
    try {
        console.log("Sending message", values);
        // Send message to the server
        const sendMail = await fetch(`${process.env.NEXTAUTH_URL}/api/sendmessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: values.message , email: values.email , username: values.name}),
        });
    
        if (!sendMail.ok) {
        console.log("error in sending mail")
        return { message: "An error occurred during sending mail"};
        }
        return true;
    } catch (error) {
        console.error("Failed to send message:", error);
    }
    }

    export default contactMessageAction;