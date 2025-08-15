# Sanity CMS Setup Guide for Vanguard Builders

This guide will help you set up and use the Sanity CMS for managing your luxury home inventory.

## 🚀 Quick Start

**IMPORTANT**: The admin interface at `/admin` will show setup instructions until you configure a real Sanity project.

### Step 1: Create a Sanity Account
1. Visit [sanity.io](https://sanity.io) and create a free account
2. Log in to your Sanity account

### Step 2: Initialize Sanity Project
Run the following commands in your project directory:

```bash
# Login to Sanity
npx sanity login

# Initialize a new project (or use existing)
npx sanity init

# Follow the prompts to:
# - Create a new project or select existing
# - Choose project name
# - Select dataset name (use "production")
# - Confirm schema path
```

### Step 3: Configure Environment Variables
Update your `.env.local` file with the real values:

```env
# Replace these placeholder values with your actual Sanity project details
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Get these tokens from your Sanity project dashboard
SANITY_API_READ_TOKEN=your_actual_read_token
SANITY_PREVIEW_SECRET=your_chosen_preview_secret
```

### Step 4: Get API Tokens
1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Go to "API" tab
4. Create a new token with "Viewer" permissions
5. Copy the token to your `.env.local` file

### Step 5: Restart Development Server
```bash
npm run dev
```

Now `/admin` should load the actual Sanity Studio interface!

## 📋 Content Management

### Adding a New Luxury Home

1. **Go to the Sanity Studio** (`/admin`)
2. **Click "Create" → "Luxury Home"**
3. **Fill in the required fields:**

   **Basic Information:**
   - **Title**: Property name (e.g., "Modern Elegance Estate")
   - **Slug**: URL-friendly version (auto-generates from title)
   - **Status**: Available, Pending, or Sold
   - **Price**: Property price in dollars
   - **Description**: Detailed property description

   **Images:**
   - **Main Image**: Primary property photo (recommended: 1920x1080)
   - **Gallery**: Additional property photos

   **Property Details:**
   - **Square Footage**: Total living space
   - **Bedrooms**: Number of bedrooms
   - **Bathrooms**: Number of bathrooms (can be decimal)
   - **Lot Size**: Property lot size (e.g., "0.5 acres")
   - **Garage Spaces**: Number of garage spaces
   - **Year Built**: Construction year

   **Location:**
   - **Address**: Street address
   - **City**: City name
   - **State**: State abbreviation (e.g., "CA")
   - **ZIP Code**: Postal code
   - **Neighborhood**: Optional neighborhood name

   **Additional Details:**
   - **Key Features**: List of property highlights
   - **Architectural Style**: Property style (e.g., "Modern", "Colonial")
   - **Virtual Tour URL**: Link to virtual tour (optional)
   - **MLS Number**: MLS listing number (optional)
   - **Featured**: Check to feature on homepage

4. **Publish the Property**
   - Click "Publish" to make the property live
   - Use "Save Draft" to work on it later

### Managing Property Status

- **Available**: Property is for sale and will appear on the website
- **Pending**: Property is under contract (shows with "Pending" badge)
- **Sold**: Property is sold (shows with "Sold" badge, not searchable)

### Featured Properties

- Check the "Featured" checkbox to display properties on the homepage
- Maximum of 3 featured properties will be shown
- Featured properties also appear first in inventory listings

## 🖼️ Image Guidelines

**Recommended Image Sizes:**
- **Main Image**: 1920x1080 pixels (16:9 aspect ratio)
- **Gallery Images**: 1200x800 pixels minimum
- **Format**: JPG or PNG
- **File Size**: Under 5MB per image

**Image Tips:**
- Use high-quality, professional photos
- Ensure good lighting and staging
- Include both interior and exterior shots
- Add descriptive alt text for accessibility

## 🔍 Preview Mode

Preview unpublished content before it goes live:

1. **Enable Preview**: Add `?preview=true` to any inventory URL
2. **Preview Banner**: Yellow banner appears when in preview mode
3. **Exit Preview**: Click "Exit Preview" in the banner
4. **Preview Access**: Requires special preview URL with secret token

## 📱 Inventory Management

### Search and Filter
- Properties can be filtered by:
  - Price range (min/max)
  - Number of bedrooms
  - Number of bathrooms
  - Architectural style

### API Endpoints
- **All Available Homes**: `/api/inventory`
- **Featured Homes**: `/api/inventory/featured`
- **Search Homes**: `/api/inventory?minPrice=500000&bedrooms=3`

## 🔧 Technical Details

### Schema Fields Reference

```typescript
interface LuxuryHome {
  title: string                    // Property name
  slug: { current: string }        // URL slug
  status: 'available'|'pending'|'sold'
  price: number                    // Price in USD
  description: string              // Property description
  mainImage: SanityImageAsset     // Primary photo
  gallery: SanityImageAsset[]     // Additional photos
  propertyDetails: {
    squareFootage: number
    bedrooms: number
    bathrooms: number
    lotSize?: string
    garageSpaces?: number
    yearBuilt?: number
  }
  location: {
    address: string
    city: string
    state: string
    zipCode: string
    neighborhood?: string
  }
  keyFeatures: string[]           // Array of features
  architecturalStyle: string      // Property style
  virtualTourUrl?: string         // Optional virtual tour
  mlsNumber?: string             // Optional MLS number
  featured: boolean              // Featured on homepage
  publishedAt: string            // Publication date
}
```

### Content Limits
- **Maximum Properties**: No limit, but recommend 1-3 active listings
- **Image Gallery**: Up to 20 images per property
- **Key Features**: Up to 15 features per property
- **Description**: No character limit, but recommend 200-500 words

## 🎯 Best Practices

### Content Strategy
1. **Quality over Quantity**: Focus on 1-3 exceptional properties
2. **Professional Photography**: Invest in high-quality images
3. **Detailed Descriptions**: Include luxury amenities and unique features
4. **Regular Updates**: Keep status and availability current
5. **SEO Optimization**: Use descriptive titles and alt text

### Workflow
1. **Draft First**: Use "Save Draft" while working on listings
2. **Review Content**: Check all fields before publishing
3. **Preview Testing**: Use preview mode to verify appearance
4. **Status Management**: Update status promptly when properties sell
5. **Archive Sold**: Keep sold properties for portfolio purposes

## 📞 Support

For technical issues or questions about the CMS:
- Check this guide first
- Review the Sanity Studio interface
- Contact your development team for custom modifications

## 🔒 Security Notes

- **API Tokens**: Keep read tokens secure and never commit to version control
- **Preview Secret**: Use a strong, unique secret for preview functionality
- **Access Control**: Sanity Studio access is controlled through Sanity's user management
- **Environment Variables**: Store all sensitive data in environment variables

---

*This CMS integration provides a powerful, client-friendly interface for managing your luxury home inventory while maintaining the high-end aesthetic of your brand.*