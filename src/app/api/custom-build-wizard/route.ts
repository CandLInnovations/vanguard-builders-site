import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, validateGraphConnection } from '@/lib/microsoft-graph';
import { applyRateLimit, RATE_LIMITS } from '@/lib/rate-limit';

interface CustomBuildWizardData {
  landStatus: string;
  homeSize: {
    squareFootage: string;
    bedrooms: number;
    bathrooms: number;
    stories: string;
  };
  features: string[];
  architecturalStyle: string;
  stylePreferences: string[];
  budget: string;
  timeline: string;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContact: 'email' | 'phone';
    message?: string;
  };
}

// Email configuration is handled by Microsoft Graph service

// Admin notification email content
const createAdminEmailContent = (data: CustomBuildWizardData): string => {
  const budgetNames: Record<string, string> = {
    '500k-750k': '$500K - $750K',
    '750k-1m': '$750K - $1M',
    '1m-1.5m': '$1M - $1.5M',
    '1.5m-2m': '$1.5M - $2M',
    '2m-plus': '$2M+'
  };

  const timelineNames: Record<string, string> = {
    'asap': 'ASAP',
    '6-months': 'Within 6 months',
    '1-year': 'Within 1 year',
    '2-years': 'Within 2 years',
    'flexible': 'Flexible'
  };

  const landStatusNames: Record<string, string> = {
    'have-land': 'I have land',
    'need-land': 'I need help finding land',
    'under-contract': 'I have land under contract'
  };

  const storiesNames: Record<string, string> = {
    'single-story': 'Single Story',
    'two-story': 'Two Story',
    'multi-level': 'Multi-Level'
  };

  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B1538 0%, #a21650 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">New Custom Home Build Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Vanguard Builders - Custom Build Wizard</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border-left: 4px solid #8B1538;">
          <h2 style="color: #1e293b; margin-top: 0;">Project Details</h2>
          <table style="width: 100%; background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 140px;">Land Status:</td>
              <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${landStatusNames[data.landStatus] || data.landStatus}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Square Footage:</td>
              <td style="padding: 8px 0; color: #1e293b;">${data.homeSize.squareFootage}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Bedrooms:</td>
              <td style="padding: 8px 0; color: #1e293b;">${data.homeSize.bedrooms}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Bathrooms:</td>
              <td style="padding: 8px 0; color: #1e293b;">${data.homeSize.bathrooms}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Stories:</td>
              <td style="padding: 8px 0; color: #1e293b;">${storiesNames[data.homeSize.stories] || data.homeSize.stories}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Architectural Style:</td>
              <td style="padding: 8px 0; color: #1e293b;">${data.architecturalStyle}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Budget:</td>
              <td style="padding: 8px 0; color: #1e293b;">${budgetNames[data.budget] || data.budget}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Timeline:</td>
              <td style="padding: 8px 0; color: #1e293b;">${timelineNames[data.timeline] || data.timeline}</td>
            </tr>
          </table>

          ${data.features.length > 0 ? `
          <h2 style="color: #1e293b; margin-top: 30px;">Features & Amenities</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <ul style="margin: 0; padding-left: 20px; color: #374151;">
              ${data.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
            </ul>
          </div>
          ` : ''}

          ${data.stylePreferences.length > 0 ? `
          <h2 style="color: #1e293b; margin-top: 30px;">Interior Style Preferences</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <ul style="margin: 0; padding-left: 20px; color: #374151;">
              ${data.stylePreferences.map(style => `<li style="margin-bottom: 8px;">${style}</li>`).join('')}
            </ul>
          </div>
          ` : ''}

          <h2 style="color: #1e293b; margin-top: 30px;">Client Information</h2>
          <table style="width: 100%; background: white; border-radius: 8px; padding: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #1e293b;">${data.contactInfo.firstName} ${data.contactInfo.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${data.contactInfo.email}" style="color: #8B1538; text-decoration: none;">${data.contactInfo.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td>
              <td style="padding: 8px 0; color: #1e293b;"><a href="tel:${data.contactInfo.phone}" style="color: #8B1538; text-decoration: none;">${data.contactInfo.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Preferred Contact:</td>
              <td style="padding: 8px 0; color: #1e293b;">${data.contactInfo.preferredContact === 'email' ? 'Email' : 'Phone'}</td>
            </tr>
          </table>

          ${data.contactInfo.message ? `
          <h2 style="color: #1e293b; margin-top: 30px;">Additional Message</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; color: #374151; line-height: 1.6;">
            ${data.contactInfo.message.replace(/\n/g, '<br>')}
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46; font-weight: 600;">⏰ Action Required</p>
            <p style="margin: 8px 0 0 0; color: #047857;">Please contact the client within 24 hours to discuss their custom home build.</p>
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
const createCustomerEmailContent = (data: CustomBuildWizardData): string => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B1538 0%, #a21650 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Thank You, ${data.contactInfo.firstName}!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your custom home build request has been received</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #1e293b; margin-top: 0;">Your Custom Home Details</h2>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Square Footage:</strong> ${data.homeSize.squareFootage}</p>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Bedrooms:</strong> ${data.homeSize.bedrooms}</p>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Bathrooms:</strong> ${data.homeSize.bathrooms}</p>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Architectural Style:</strong> ${data.architecturalStyle}</p>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Budget:</strong> ${data.budget}</p>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Timeline:</strong> ${data.timeline}</p>
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 25px;">
            <h3 style="color: #065f46; margin-top: 0;">What Happens Next?</h3>
            <ul style="color: #047857; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Our design team will review your custom home requirements</li>
              <li style="margin-bottom: 8px;">We'll contact you within 24 hours to schedule your design consultation</li>
              <li style="margin-bottom: 8px;">During the consultation, we'll discuss your vision, budget, and timeline in detail</li>
              <li style="margin-bottom: 8px;">We'll create initial design concepts and provide a detailed project proposal</li>
            </ul>
          </div>

          <div style="text-align: center;">
            <p style="color: #64748b; margin-bottom: 20px;">Questions about your custom home build?</p>
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
    // Apply rate limiting (2 submissions per hour per IP)
    const rateLimitResult = await applyRateLimit(request, RATE_LIMITS.WIZARD);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many wizard submissions. Please try again later.',
          retryAfter: rateLimitResult.headers['Retry-After']
        },
        {
          status: 429,
          headers: rateLimitResult.headers
        }
      );
    }

    const data: CustomBuildWizardData = await request.json();

    // Basic validation
    if (!data.contactInfo?.firstName || !data.contactInfo?.lastName || !data.contactInfo?.email || !data.contactInfo?.phone) {
      return NextResponse.json(
        { error: 'Missing required contact information' },
        { status: 400 }
      );
    }

    if (!data.landStatus || !data.homeSize?.squareFootage || !data.architecturalStyle || !data.budget || !data.timeline) {
      return NextResponse.json(
        { error: 'Missing required project information' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactInfo.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\(\)\+\.]+$/;
    if (!phoneRegex.test(data.contactInfo.phone)) {
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
      subject: `New Custom Home Build Request - ${data.contactInfo.firstName} ${data.contactInfo.lastName}`,
      toRecipients: [process.env.ADMIN_EMAIL || 'office@vanguardbuilders.com'],
      body: {
        contentType: 'HTML',
        content: createAdminEmailContent(data),
      },
    });

    // Send customer confirmation
    await sendEmail({
      subject: 'Custom Home Build Request Received - Vanguard Builders',
      toRecipients: [data.contactInfo.email],
      body: {
        contentType: 'HTML',
        content: createCustomerEmailContent(data),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Custom home build request submitted successfully! Our design team will contact you within 24 hours.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing custom build request:', error);

    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });

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