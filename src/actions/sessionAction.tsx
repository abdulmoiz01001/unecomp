"use server";

import { auth } from "@/auth";
const sessionAction = async () => {
    try{

        const session = await auth();
        console.log(session);
        return session;
    }catch(e){
        console.log(e)
    }
}

export default sessionAction;