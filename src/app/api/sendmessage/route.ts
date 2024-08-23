
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 587,
  auth: {
      user: 'goldsmith08001@gmail.com',
      pass: 'iblt mdke ygbe xcrx'
  }
});

export async function POST(req : Request) {
  try {
    const body = await req.json();
    console.log(body);

    // const ConfirmationLink = `${process.env.NEXTAUTH_URL}/auth/email-verification?token=${body?.token}`;
//  const ConfirmationLink = "https://example.com/verify-email?token=1234567890";
    const info = await transporter.sendMail({
      from: 'goldsmith08001@gmail.com', // sender address
      to:  'profession.ai01001@hotmail.com', // receiver's email (can be passed in the request body)
      subject: `New Contact Message from ${body.username}`, // Subject line
      text: ``, // plain text body
      html: `<div class="max-w-lg mx-auto my-8 bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
  <div class="text-center mb-6">
    <h1 class="text-6xl font-bold text-gray-800 mb-2">Contact Message</h1>
  </div>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-4">You've Received a New Message!</h1>
    <p class="text-gray-700 mb-4">Dear Team,</p>
    <p class="text-gray-700 mb-4">You have received a new message from a customer through the contact form on your website. Below are the details of the message:</p>
    <p class="text-gray-700 mb-4"><strong>Name:</strong> ${body.username}</p>
    <p class="text-gray-700 mb-4"><strong>Email:</strong> ${body.email}</p>
    <p class="text-gray-700 mb-4"><strong>Message:</strong></p>
    <p class="text-gray-700 mb-4">${body.message}</p>
    <div class="text-center mb-6">
    </div>
    <p class="text-gray-700 mb-4">Please reply to the customer as soon as possible to address their inquiry or concern.</p>
    <h2 class="text-xl font-semibold text-gray-800 mb-2">Need help?</h2>
    <p class="text-gray-700 mb-4">If you need assistance in responding to this message, feel free to reach out to our support team at <a href="asadchipa15@gmail.com" class="text-blue-500 hover:underline">asadchipa15@gmail.com</a>. We're here to help!</p>
    <p class="text-gray-700 mb-6">Best regards,<br>The UneComp Team</p>
  </div>
  <div class="text-center text-gray-500 text-sm">
    <p>UneComp Services<br>1234 Innovation Drive, Suite 100<br>Tech City, TC 12345</p>
    <p><a href="#" class="text-blue-500 hover:underline">Privacy Policy</a> | <a href="" class="text-blue-500 hover:underline">Terms of Service</a></p>
  </div>
</div>
`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    return new Response(
      JSON.stringify({ success: true, message: "Verification email sent!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email: ", error);

    return new Response(
      JSON.stringify({ success: false, message: "Failed to send email." }),
      { status: 500 }
    );
  }
}
