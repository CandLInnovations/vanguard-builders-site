import { Client } from '@microsoft/microsoft-graph-client';
import { ConfidentialClientApplication } from '@azure/msal-node';

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
  },
};

let msalInstance: ConfidentialClientApplication | null = null;
let graphClient: Client | null = null;

// Initialize MSAL instance
const getMsalInstance = (): ConfidentialClientApplication => {
  if (!msalInstance) {
    if (!process.env.AZURE_CLIENT_ID || !process.env.AZURE_CLIENT_SECRET || !process.env.AZURE_TENANT_ID) {
      throw new Error('Microsoft Graph OAuth configuration missing. Please check environment variables.');
    }
    msalInstance = new ConfidentialClientApplication(msalConfig);
  }
  return msalInstance;
};

// Get access token using client credentials flow
const getAccessToken = async (): Promise<string> => {
  try {
    const msal = getMsalInstance();

    const clientCredentialRequest = {
      scopes: ['https://graph.microsoft.com/.default'],
      skipCache: false,
    };

    const response = await msal.acquireTokenByClientCredential(clientCredentialRequest);
    if (!response) {
      throw new Error('No token response received');
    }
    return response.accessToken;
  } catch (error) {
    console.error('Error acquiring access token:', error);
    throw new Error('Failed to acquire access token');
  }
};

// Get authenticated Graph client
export const getGraphClient = async (): Promise<Client> => {
  if (!graphClient) {
    const accessToken = await getAccessToken();

    graphClient = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });
  }
  return graphClient;
};

// Send email using Microsoft Graph API
interface EmailMessage {
  subject: string;
  toRecipients: string[];
  body: {
    contentType: 'HTML' | 'Text';
    content: string;
  };
  from?: string;
}

export const sendEmail = async (emailData: EmailMessage): Promise<void> => {
  try {
    const graphClient = await getGraphClient();

    const message = {
      subject: emailData.subject,
      body: {
        contentType: emailData.body.contentType,
        content: emailData.body.content,
      },
      toRecipients: emailData.toRecipients.map(email => ({
        emailAddress: {
          address: email,
        },
      })),
    };

    // Send email from the configured user account
    const senderEmail = process.env.FROM_EMAIL || 'office@vanguardbuilders.com';

    await graphClient
      .api(`/users/${senderEmail}/sendMail`)
      .post({
        message,
        saveToSentItems: true,
      });

    console.log(`Email sent successfully to: ${emailData.toRecipients.join(', ')}`);
  } catch (error) {
    console.error('Error sending email via Microsoft Graph:', error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Validate Graph API connection
export const validateGraphConnection = async (): Promise<boolean> => {
  try {
    const graphClient = await getGraphClient();
    const senderEmail = process.env.FROM_EMAIL || 'office@vanguardbuilders.com';

    // Test connection by getting user info
    await graphClient.api(`/users/${senderEmail}`).get();
    return true;
  } catch (error) {
    console.error('Graph API connection validation failed:', error);
    return false;
  }
};