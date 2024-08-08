import { Resend } from 'resend';



const resend = new Resend("re_QfDrW1vH_ACn9EqgbqcZiTW2uZ8BGpPBD");


export const sendVerificationEmail = async (email : string,token : string ) => {


 
  const ConfirmationLink = `${process.env.NEXTAUTH_URL}/auth/email-verification?token=${token}`;

  await resend.emails.send({
   from: "unecomp@projectcomponents.com",
   to: email,
   subject: "Confirm your email address",
   html: `<p>Please confirm your email address by clicking on this link: <a href="${ConfirmationLink}">${ConfirmationLink}</a></p>`,
  })

}