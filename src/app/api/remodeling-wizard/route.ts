import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, validateGraphConnection } from '@/lib/microsoft-graph';

interface RemodelingWizardData {
  projectTypes: string[];
  scopes: Record<string, string>;
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
const createAdminEmailContent = (data: RemodelingWizardData): string => {
  const budgetNames: Record<string, string> = {
    '25k-50k': '$25K - $50K',
    '50k-100k': '$50K - $100K',
    '100k-250k': '$100K - $250K',
    '250k-500k': '$250K - $500K',
    '500k-plus': '$500K+'
  };

  const timelineNames: Record<string, string> = {
    'asap': 'ASAP',
    '3-months': 'Within 3 months',
    '6-months': 'Within 6 months',
    '1-year': 'Within 1 year',
    'flexible': 'Flexible'
  };

  const projectTypeNames: Record<string, string> = {
    'kitchen': 'Kitchen Remodel',
    'bathroom': 'Bathroom Remodel',
    'addition': 'Home Addition',
    'whole-home': 'Whole Home Remodel',
    'outdoor': 'Outdoor Living',
    'other': 'Other'
  };

  const scopeNames: Record<string, string> = {
    'minor': 'Minor Updates',
    'moderate': 'Moderate Renovation',
    'major': 'Major Overhaul',
    'complete': 'Complete Rebuild'
  };

  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B1538 0%, #a21650 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">New Remodeling Project Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Vanguard Builders - Remodeling Wizard</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border-left: 4px solid #8B1538;">
          <h2 style="color: #1e293b; margin-top: 0;">Project Details</h2>
          <table style="width: 100%; background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 140px;">Budget:</td>
              <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${budgetNames[data.budget] || data.budget}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Timeline:</td>
              <td style="padding: 8px 0; color: #1e293b;">${timelineNames[data.timeline] || data.timeline}</td>
            </tr>
          </table>

          <h2 style="color: #1e293b; margin-top: 30px;">Project Types & Scopes</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            ${data.projectTypes.map(projectType => {
              const scope = data.scopes[projectType];
              return `
                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                  <strong style="color: #1e293b; display: block; margin-bottom: 5px;">${projectTypeNames[projectType] || projectType}</strong>
                  <span style="color: #64748b;">Scope: ${scopeNames[scope] || scope}</span>
                </div>
              `;
            }).join('')}
          </div>

          ${data.stylePreferences.length > 0 ? `
          <h2 style="color: #1e293b; margin-top: 30px;">Style Preferences</h2>
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
            <p style="margin: 8px 0 0 0; color: #047857;">Please contact the client within 24 hours to discuss their remodeling project.</p>
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
const createCustomerEmailContent = (data: RemodelingWizardData): string => {
  const projectTypeNames: Record<string, string> = {
    'kitchen': 'Kitchen Remodel',
    'bathroom': 'Bathroom Remodel',
    'addition': 'Home Addition',
    'whole-home': 'Whole Home Remodel',
    'outdoor': 'Outdoor Living',
    'other': 'Other'
  };

  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B1538 0%, #a21650 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Thank You, ${data.contactInfo.firstName}!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your remodeling project request has been received</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #1e293b; margin-top: 0;">Your Project Details</h2>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Project Types:</strong> ${data.projectTypes.map(type => projectTypeNames[type] || type).join(', ')}</p>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Budget:</strong> ${data.budget}</p>
            <p style="color: #374151; margin-bottom: 15px;"><strong>Timeline:</strong> ${data.timeline}</p>
            ${data.stylePreferences.length > 0 ? `<p style="color: #374151; margin-bottom: 15px;"><strong>Style Preferences:</strong> ${data.stylePreferences.join(', ')}</p>` : ''}
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 25px;">
            <h3 style="color: #065f46; margin-top: 0;">What Happens Next?</h3>
            <ul style="color: #047857; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Our design team will review your remodeling project requirements</li>
              <li style="margin-bottom: 8px;">We'll contact you within 24 hours to schedule your design consultation</li>
              <li style="margin-bottom: 8px;">During the consultation, we'll discuss your vision, budget, and timeline in detail</li>
              <li style="margin-bottom: 8px;">We'll provide initial design concepts and a detailed project proposal</li>
            </ul>
          </div>

          <div style="text-align: center;">
            <p style="color: #64748b; margin-bottom: 20px;">Questions about your remodeling project?</p>
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
    const data: RemodelingWizardData = await request.json();

    // Basic validation
    if (!data.contactInfo?.firstName || !data.contactInfo?.lastName || !data.contactInfo?.email || !data.contactInfo?.phone) {
      return NextResponse.json(
        { error: 'Missing required contact information' },
        { status: 400 }
      );
    }

    if (!data.projectTypes?.length || !data.budget || !data.timeline) {
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
      subject: `New Remodeling Project Request - ${data.contactInfo.firstName} ${data.contactInfo.lastName}`,
      toRecipients: [process.env.ADMIN_EMAIL || 'office@vanguardbuilders.com'],
      body: {
        contentType: 'HTML',
        content: createAdminEmailContent(data),
      },
    });

    // Send customer confirmation
    await sendEmail({
      subject: 'Remodeling Project Request Received - Vanguard Builders',
      toRecipients: [data.contactInfo.email],
      body: {
        contentType: 'HTML',
        content: createCustomerEmailContent(data),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Remodeling project request submitted successfully! Our design team will contact you within 24 hours.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing remodeling request:', error);

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