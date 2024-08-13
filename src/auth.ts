import NextAuth , {CredentialsSignin} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import User from "./lib/modals/user";
import { signInSchema } from "./lib/zod";
// import { orderByChild } from "firebase/database";

import getUserByEmailAction from "./actions/getUserByEmailAction";
import GoogleProvider from "next-auth/providers/google";
interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
};
// import User from "./lib/modals/user";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  
  providers: [
    CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: {  label: "Password", type: "password" },
        },
    async authorize(credentials: Partial<Record<"email" | "password", unknown>>, req: Request): Promise<object | null> {
     try{
      console.log("This is email and password :: " + credentials.email + " " + credentials.password);

      const validate = signInSchema.safeParse({ email: credentials.email, password: credentials.password });

      if (!validate.success) return { error: validate.error}
        ;

      // const user = await User.findOne({ email: credentials.email }); // Remove this line

      const res : any = await getUserByEmailAction(credentials.email as string);

      if (!res.ok) {
       return { error: "User not found"}
      }
         
      const user = await res.json();
      console.log("This is the user fetched in authorize callback ::", user);

      if (!user) {
        return { error: "User not found"}
      }
      // console.log( "This is a user fetched in authorize callback :: " + user);
      // if (!user) throw new CredentialsSignin({ cause: "User not found" }) 

      // const hash = await bycrpt.hash(credentials.password as string, 10);

      // const comparebybycrpt = bycrpt.compare(hash, user.password);

      // if (!comparebybycrpt) throw new CredentialsSignin({ cause: "Incorrect password" });
        console.log("I approached to the end of authorize callback");
      return user;
     }catch(e){
           console.log("This is an error in authorize callback :: " , e);
          return { error: "An error occurred during authorization"};
      }
    }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user && (user as User).role !== "blocked") {
        console.log("This is a user obeject in signin callback :: " , user);
        return true;
      } else {  

        console.log("error side user obeject in signin callback :: " , user);
        return false;
      }
    },
    async jwt({token, user}) {
      console.log("This is a user obeject in jwt callback :: " , user);
      if (user) {
        token.role = (user as User).role;
        if((user as User)._id && (user as User).email && (user as User).name && (user as User).role){

          token._id = (user as User)._id;
          token.email = (user as User).email;
          token.name = (user as User).name;
          token.role = (user as User).role;
      
        }
      }
      return token;
    },
    async session({session, token}) {
      console.log("This is a user obeject in session callback :: " , token);
      console.log("This is a user obeject in session callback :: " , session);
    
      session.user = token as any;
      // if(!session.user ) return session;
      // (session?.user as User)?.role = token.role;
      return session;
    }
    // async session({ session, token, user }) {
    //   // Add custom user properties to the session object
    //   session.user.id = user.id;
    //   // session.user.role = user.role;
    //   // Add any additional data you want to include in the session
    //   // session.user.customData = token.customData;

    //   return session;
    // },

    // async jwt({ token, user, account, profile, isNewUser }) {
    //   if (user) {
    //     token.id = user.id;
    //     // token.role = user.role;
    //   }

    //   return token;
    // }
  },
  pages: {
    signIn: '/auth/login', // Custom sign in page
  },
})