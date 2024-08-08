"use server"

const tokenVerification = async (token: string) => {
    console.log("Email template :", token);
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/token?token=${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            //   body: JSON.stringify(token),
        });





        console.log(res);

        const verified = await fetch(`${process.env.NEXTAUTH_URL}/api/token?token=${token}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });
        console.log(verified);
        return res.json();
    } catch (error) {
        console.log("Not Connected");
    }
};

export default tokenVerification;