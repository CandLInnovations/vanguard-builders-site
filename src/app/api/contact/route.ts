import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, validateGraphConnection } from '@/lib/microsoft-graph';
import { applyRateLimit, RATE_LIMITS, getClientIdentifier } from '@/lib/rate-limit';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { analyzeContentQuality, validateNameQuality } from '@/lib/content-quality';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  turnstileToken?: string;
}

// Email configuration is handled by Microsoft Graph service

// Admin notification email content
const createAdminEmailContent = (data: ContactFormData): string => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B1538 0%, #a21650 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">New Contact Message</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Vanguard Builders - Website Contact Form</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border-left: 4px solid #8B1538;">
          <h2 style="color: #1e293b; margin-top: 0;">Message Details</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #374151; margin-bottom: 15px; font-size: 18px; font-weight: 600;">
              <strong>Subject:</strong> ${data.subject}
            </p>
          </div>
          
          <h2 style="color: #1e293b; margin-top: 30px;">Contact Information</h2>
          <table style="width: 100%; background: white; border-radius: 8px; padding: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #1e293b;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${data.email}" style="color: #8B1538; text-decoration: none;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td>
              <td style="padding: 8px 0; color: #1e293b;"><a href="tel:${data.phone}" style="color: #8B1538; text-decoration: none;">${data.phone}</a></td>
            </tr>
          </table>
          
          <h2 style="color: #1e293b; margin-top: 30px;">Message</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; color: #374151; line-height: 1.6;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46; font-weight: 600;">⏰ Action Required</p>
            <p style="margin: 8px 0 0 0; color: #047857;">Please respond to this inquiry within 24 hours.</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; color: #64748b; font-size: 14px;">
          <p style="margin: 0;">This email was sent from the Vanguard Builders website</p>
          <p style="margin: 8px 0 0 0;">Generated on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;
};

// Customer confirmation email content
const createCustomerEmailContent = (data: ContactFormData): string => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B1538 0%, #a21650 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Thank You, ${data.name}!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your message has been received</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #1e293b; margin-top: 0;">Your Message</h2>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Subject:</strong> ${data.subject}</p>
            <div style="color: #374151; line-height: 1.6; font-style: italic;">
              "${data.message.length > 150 ? data.message.substring(0, 150) + '...' : data.message}"
            </div>
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 25px;">
            <h3 style="color: #065f46; margin-top: 0;">What Happens Next?</h3>
            <ul style="color: #047857; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Our team will review your message</li>
              <li style="margin-bottom: 8px;">We'll respond within 24 hours during business days</li>
              <li style="margin-bottom: 8px;">If you need immediate assistance, please call us</li>
            </ul>
          </div>

          <div style="text-align: center;">
            <p style="color: #64748b; margin-bottom: 20px;">Need immediate assistance?</p>
            <a href="tel:281-220-9087" style="display: inline-block; background: linear-gradient(135deg, #8B1538 0%, #a21650 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              📞 Call (281) 220-9087
            </a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; color: #64748b; font-size: 14px;">
          <p style="margin: 0;">Thank you for choosing Vanguard Builders</p>
          <p style="margin: 8px 0 0 0;"><em>Crafting Architectural Excellence</em></p>
        </div>
      </div>
    `;
};

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (3 submissions per hour per IP)
    const rateLimitResult = await applyRateLimit(request, RATE_LIMITS.CONTACT_FORM);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many contact form submissions. Please try again later.',
          retryAfter: rateLimitResult.headers['Retry-After']
        },
        {
          status: 429,
          headers: rateLimitResult.headers
        }
      );
    }

    const data: ContactFormData = await request.json();

    // Verify Turnstile token
    const turnstileResult = await verifyTurnstileToken(
      data.turnstileToken,
      getClientIdentifier(request)
    );
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: turnstileResult.error },
        { status: 403 }
      );
    }

    // Content quality checks
    const nameQuality = validateNameQuality(data.name);
    if (!nameQuality.isAcceptable) {
      return NextResponse.json(
        { error: 'Please provide a valid name.' },
        { status: 400 }
      );
    }

    const messageQuality = analyzeContentQuality(data.message);
    if (!messageQuality.isAcceptable) {
      return NextResponse.json(
        { error: 'Your message could not be processed. Please revise and try again.' },
        { status: 400 }
      );
    }

    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\(\)\+\.]+$/;
    if (!phoneRegex.test(data.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Check if Microsoft Graph OAuth configuration exists
    if (!process.env.AZURE_CLIENT_ID || !process.env.AZURE_CLIENT_SECRET || !process.env.AZURE_TENANT_ID) {
      console.error('Microsoft Graph OAuth configuration missing');
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      );
    }

    // Validate Graph API connection
    const isConnected = await validateGraphConnection();
    if (!isConnected) {
      console.error('Microsoft Graph API connection failed');
      return NextResponse.json(
        { error: 'Email service temporarily unavailable. Please try again later.' },
        { status: 500 }
      );
    }

    // Send admin notification
    await sendEmail({
      subject: `New Contact Form Message - ${data.subject}`,
      toRecipients: [process.env.ADMIN_EMAIL || 'office@vanguardbuilders.com'],
      body: {
        contentType: 'HTML',
        content: createAdminEmailContent(data),
      },
    });

    // Send customer confirmation
    await sendEmail({
      subject: 'Message Received - Vanguard Builders',
      toRecipients: [data.email],
      body: {
        contentType: 'HTML',
        content: createCustomerEmailContent(data),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully! We will respond within 24 hours.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);

    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });

      return NextResponse.json(
        { error: 'Unable to send your message. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}