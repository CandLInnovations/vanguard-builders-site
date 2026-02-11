import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, validateGraphConnection } from '@/lib/microsoft-graph';
import { applyRateLimit, RATE_LIMITS, getClientIdentifier } from '@/lib/rate-limit';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { analyzeContentQuality, validateNameQuality } from '@/lib/content-quality';
import { escapeHtml, escapeHtmlWithBreaks } from '@/lib/sanitize';

interface ShowingFormData {
  name: string;
  email: string;
  phone: string;
  property: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  turnstileToken?: string;
}

// Email configuration is handled by Microsoft Graph service

// Admin notification email content
const createAdminEmailContent = (data: ShowingFormData): string => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B1538 0%, #a21650 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">New Showing Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Vanguard Builders - Luxury Home Showings</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border-left: 4px solid #8B1538;">
          <h2 style="color: #1e293b; margin-top: 0;">Property Details</h2>
          <p style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0; color: #374151; font-size: 16px; font-weight: 600;">
            ${escapeHtml(data.property)}
          </p>

          <h2 style="color: #1e293b; margin-top: 30px;">Client Information</h2>
          <table style="width: 100%; background: white; border-radius: 8px; padding: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #1e293b;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${escapeHtml(data.email)}" style="color: #8B1538; text-decoration: none;">${escapeHtml(data.email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td>
              <td style="padding: 8px 0; color: #1e293b;"><a href="tel:${escapeHtml(data.phone)}" style="color: #8B1538; text-decoration: none;">${escapeHtml(data.phone)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Preferred Date:</td>
              <td style="padding: 8px 0; color: #1e293b;">${escapeHtml(data.preferredDate || 'Not specified')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Preferred Time:</td>
              <td style="padding: 8px 0; color: #1e293b;">${escapeHtml(data.preferredTime || 'Not specified')}</td>
            </tr>
          </table>

          ${data.message ? `
          <h2 style="color: #1e293b; margin-top: 30px;">Additional Comments</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; color: #374151; line-height: 1.6;">
            ${escapeHtmlWithBreaks(data.message)}
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 20px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46; font-weight: 600;">⏰ Action Required</p>
            <p style="margin: 8px 0 0 0; color: #047857;">Please contact the client within 24 hours to confirm their showing appointment.</p>
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
const createCustomerEmailContent = (data: ShowingFormData): string => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B1538 0%, #a21650 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Thank You, ${escapeHtml(data.name)}!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your luxury home showing request has been received</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #1e293b; margin-top: 0;">Your Showing Details</h2>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Property:</strong> ${escapeHtml(data.property)}</p>
            ${data.preferredDate ? `<p style="color: #374151; margin-bottom: 15px;"><strong>Preferred Date:</strong> ${escapeHtml(data.preferredDate)}</p>` : ''}
            ${data.preferredTime ? `<p style="color: #374151; margin-bottom: 15px;"><strong>Preferred Time:</strong> ${escapeHtml(data.preferredTime)}</p>` : ''}
          </div>
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 25px;">
            <h3 style="color: #065f46; margin-top: 0;">What Happens Next?</h3>
            <ul style="color: #047857; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Our luxury home specialists will review your request</li>
              <li style="margin-bottom: 8px;">We'll contact you within 24 hours to confirm your appointment</li>
              <li style="margin-bottom: 8px;">We'll prepare a personalized tour experience for you</li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <p style="color: #64748b; margin-bottom: 20px;">Questions before your showing?</p>
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
    const rateLimitResult = await applyRateLimit(request, RATE_LIMITS.SCHEDULE_SHOWING);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many showing requests. Please try again later.',
          retryAfter: rateLimitResult.headers['Retry-After']
        },
        {
          status: 429,
          headers: rateLimitResult.headers
        }
      );
    }

    const data: ShowingFormData = await request.json();

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

    if (data.message) {
      const messageQuality = analyzeContentQuality(data.message);
      if (!messageQuality.isAcceptable) {
        return NextResponse.json(
          { error: 'Your message could not be processed. Please revise and try again.' },
          { status: 400 }
        );
      }
    }

    // Basic validation
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and phone are required' },
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
      subject: `New Showing Request - ${data.property}`,
      toRecipients: [process.env.ADMIN_EMAIL || 'office@vanguardbuilders.com'],
      body: {
        contentType: 'HTML',
        content: createAdminEmailContent(data),
      },
    });

    // Send customer confirmation
    await sendEmail({
      subject: 'Showing Request Received - Vanguard Builders',
      toRecipients: [data.email],
      body: {
        contentType: 'HTML',
        content: createCustomerEmailContent(data),
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Showing request submitted successfully! We will contact you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing showing request:', error);
    
    if (error instanceof Error) {
      // Log specific error details for debugging
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
      
      // Return user-friendly error message
      return NextResponse.json(
        { error: 'Unable to process your request. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}