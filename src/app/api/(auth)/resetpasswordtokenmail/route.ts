

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

    const ConfirmationLink = `${process.env.NEXTAUTH_URL}/auth/forgot-password?resetPasswordToken=${body?.resetPasswordToken}`;
//  const ConfirmationLink = "https://example.com/verify-email?token=1234567890";
    const info = await transporter.sendMail({
      from: 'goldsmith08001@gmail.com', // sender address
      to:  body.email, // receiver's email (can be passed in the request body)
      subject: 'Activate Your UneComp Account by Verifying Your Email', // Subject line
      text: `Please verify your email by clicking the link: ${ConfirmationLink}`, // plain text body
      html: `<div class="max-w-lg mx-auto my-8 bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
    <div class="text-center mb-6">
        <h1 class="text-6xl font-bold text-gray-800 mb-2">UneComp Services</h1>
    </div>
    <div>
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Reset Your Password</h1>
        <p class="text-gray-700 mb-4">Dear Customer,</p>
        <p class="text-gray-700 mb-4">We received a request to reset the password for your UneComp account. If you made this request, please click the link below to set a new password:</p>
        <div class="text-center mb-6">
            <a href="${ConfirmationLink}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Reset Your Password</a>
        </div>
        <p class="text-gray-700 mb-4">If you did not request a password reset, you can safely ignore this email. Your password will not be changed unless you click the link above and create a new one.</p>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Need Help?</h2>
        <p class="text-gray-700 mb-4">If you encounter any issues during the password reset process, feel free to contact our support team at <a href="asadchipa15@gmail.com" class="text-blue-500 hover:underline">asadchipa15@gmail.com</a>. We're here to help!</p>
        <p class="text-gray-700 mb-6">Best regards,<br>The UneComp Team</p>
    </div>
    <div class="text-center text-gray-500 text-sm">
        <p>UneComp Services<br>1234 Innovation Drive, Suite 100<br>Tech City, TC 12345</p>
        <p><a href="#" class="text-blue-500 hover:underline">Privacy Policy</a> | <a href="#" class="text-blue-500 hover:underline">Terms of Service</a></p>
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
