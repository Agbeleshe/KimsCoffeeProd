// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log("📧 Email API called!");

  try {
    const { email, orderId, amount, fullName } = await request.json();
    console.log("Received:", { email, orderId, amount, fullName });

    // Validate required fields
    
    if (!email || !orderId) {
      return NextResponse.json(
        { error: "Missing email or orderId" },
        { status: 400 }
      );
    }

    // Send actual email via Resend
    const { data, error } = await resend.emails.send({
      from: "Kim Coffee <onboarding@resend.dev>",
      to: [email],
      subject: `Your Kim Coffee Order #${orderId} is Confirmed! ☕`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #d97706; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">
            Thank you for your order, ${fullName}!
          </h1>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #92400e; margin-top: 0;">Order Details</h2>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Total Amount:</strong> ₦${Number(amount).toLocaleString()}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>Your premium Kim Coffee order has been received and is being processed.</p>
          <p>We'll notify you when your order ships!</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>If you have any questions, reply to this email or contact us.</p>
            <p>Thank you for choosing Kim Coffee! ☕</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: `Email failed: ${error.message}` },
        { status: 500 }
      );
    }

    console.log("✅ Email sent successfully! Resend ID:", data?.id);

    return NextResponse.json({
      success: true,
      message: `Order confirmation sent to ${email}`,
      orderId: orderId,
      resendId: data?.id,
    });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
