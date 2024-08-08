import { Resend } from 'resend';

const resend = new Resend("re_QfDrW1vH_ACn9EqgbqcZiTW2uZ8BGpPBD");

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    const ConfirmationLink = `${process.env.NEXTAUTH_URL}/auth/email-verification?token=${body?.token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: body.email,
      subject: 'Activate Your UneComp Account by Verifying Your Email',
      html: `<div class="max-w-lg mx-auto my-8 bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
        <div class="text-center mb-6">
           <h1 class="text-6xl font-bold text-gray-800 mb-2">UneComp Services</h1>
        </div>
        <div>
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Welcome to UneComp Services!</h1>
            <p class="text-gray-700 mb-4">Dear Customer,</p>
            <p class="text-gray-700 mb-4">We are thrilled to have you on board. To ensure the security of your account and to complete your registration, we need to verify your email address. Please click the link below to confirm your email and activate your account:</p>
            <div class="text-center mb-6">
                <a href="${ConfirmationLink}" class="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Verify Your Email Address</a>
            </div>
            <p class="text-gray-700 mb-4">If you did not create an account with UneComp Services, please disregard this email.</p>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">What happens next?</h2>
            <p class="text-gray-700 mb-4">
                - After verifying your email, you will gain full access to all features and services offered by UneComp.<br>
                - You can start customizing your profile, exploring our resources, and connecting with other members of our community.
            </p>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Need help?</h2>
            <p class="text-gray-700 mb-4">If you encounter any issues during the verification process, feel free to contact our support team at <a href="mailto:support@unecomp.com" class="text-blue-500 hover:underline">support@unecomp.com</a>. We're here to help!</p>
            <p class="text-gray-700 mb-4">Thank you for joining UneComp Services. We're excited to have you as part of our community.</p>
            <p class="text-gray-700 mb-6">Best regards,<br>The UneComp Team</p>
        </div>
        <div class="text-center text-gray-500 text-sm">
            <p>UneComp Services<br>1234 Innovation Drive, Suite 100<br>Tech City, TC 12345</p>
            <p><a href="#" class="text-blue-500 hover:underline">Privacy Policy</a> | <a href="#" class="text-blue-500 hover:underline">Terms of Service</a></p>
        </div>
    </div>`,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
