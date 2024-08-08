// "use server"

// import {auth , signOut } from '@/auth';

// const logoutAction = async () => {

//     try {
//         await signOut();
        
//         return { message: "User logged out successfully" };

//     } catch (e) {
//         console.log(e);
//     }
// }

// export default logoutAction;

"use server";
import { signOut } from '@/auth';
import { setCookie, destroyCookie } from 'nookies';

const logoutAction = async () => {
  try {
    destroyCookie(null, 'auth-token');
    destroyCookie(null, 'authjs.session-token');
    destroyCookie(null, 'authjs.callback-url');

    await signOut({ redirect: false }); // prevent automatic redirect
    return { message: "User logged out successfully" };
  } catch (e) {
    console.log(e);
    return { error: "Logout failed" };
  }
};

export default logoutAction;