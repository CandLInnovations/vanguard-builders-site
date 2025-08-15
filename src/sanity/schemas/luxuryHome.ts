import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'luxuryHome',
  title: 'Luxury Home Inventory',
  type: 'document',
  icon: () => '🏡',
  fields: [
    defineField({
      name: 'title',
      title: 'Home Title',
      type: 'string',
      description: 'A compelling title for this luxury home',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from title - used in the website URL',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Pending Sale', value: 'pending'},
          {title: 'Sold', value: 'sold'},
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Listed Price',
      type: 'number',
      description: 'Enter the price in USD (without commas or dollar sign)',
      validation: (Rule) => Rule.required().min(100000),
    }),
    defineField({
      name: 'description',
      title: 'Property Description',
      type: 'text',
      description: 'Detailed description highlighting luxury features and unique selling points',
      rows: 4,
      validation: (Rule) => Rule.required().min(100).max(500),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Hero Image',
      type: 'image',
      description: 'Primary image that will be featured prominently',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      description: 'Additional high-quality images showcasing the property',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Image Caption',
              description: 'Optional caption describing what this image shows',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: 'propertyDetails',
      title: 'Property Details',
      type: 'object',
      fields: [
        {
          name: 'squareFootage',
          title: 'Square Footage',
          type: 'number',
          description: 'Total square footage of the home',
          validation: (Rule) => Rule.required().min(500),
        },
        {
          name: 'bedrooms',
          title: 'Bedrooms',
          type: 'number',
          validation: (Rule) => Rule.required().min(1).max(10),
        },
        {
          name: 'bathrooms',
          title: 'Bathrooms',
          type: 'number',
          description: 'Use decimal for half baths (e.g., 3.5 for 3 full + 1 half)',
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'lotSize',
          title: 'Lot Size',
          type: 'string',
          description: 'Lot size (e.g., "0.5 acres" or "12,500 sq ft")',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'garageSpaces',
          title: 'Garage Spaces',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(10),
        },
        {
          name: 'yearBuilt',
          title: 'Year Built',
          type: 'number',
          validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 2),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location Information',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Street Address',
          type: 'string',
          description: 'Full street address or "Address available upon request" for privacy',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          initialValue: 'TX',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'zipCode',
          title: 'ZIP Code',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'neighborhood',
          title: 'Neighborhood/Subdivision',
          type: 'string',
          description: 'e.g., "River Oaks", "The Woodlands"',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features & Amenities',
      type: 'array',
      description: 'Highlight the most impressive features of this luxury home',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.required().min(3).max(15),
    }),
    defineField({
      name: 'architecturalStyle',
      title: 'Architectural Style',
      type: 'string',
      options: {
        list: [
          {title: 'Modern Contemporary', value: 'modern-contemporary'},
          {title: 'Traditional Colonial', value: 'traditional-colonial'},
          {title: 'Mediterranean Villa', value: 'mediterranean-villa'},
          {title: 'Transitional', value: 'transitional'},
          {title: 'Craftsman', value: 'craftsman'},
          {title: 'Tudor', value: 'tudor'},
          {title: 'French Country', value: 'french-country'},
          {title: 'Custom Design', value: 'custom'},
        ],
      },
    }),
    defineField({
      name: 'virtualTourUrl',
      title: 'Virtual Tour URL',
      type: 'url',
      description: 'Optional link to 3D virtual tour or video walkthrough',
    }),
    defineField({
      name: 'mlsNumber',
      title: 'MLS Number',
      type: 'string',
      description: 'Multiple Listing Service number (if applicable)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this listing should go live on the website',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      price: 'price',
      status: 'status',
      image: 'mainImage',
      bedrooms: 'propertyDetails.bedrooms',
      bathrooms: 'propertyDetails.bathrooms',
      sqft: 'propertyDetails.squareFootage',
    },
    prepare({title, price, status, image, bedrooms, bathrooms, sqft}) {
      const formattedPrice = price ? `$${price.toLocaleString()}` : 'Price not set'
      const statusEmoji = status === 'available' ? '✅' : status === 'pending' ? '🟡' : '❌'
      
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: `${formattedPrice} • ${bedrooms}bed/${bathrooms}bath • ${sqft?.toLocaleString()} sq ft`,
        media: image,
      }
    },
  },
  
  orderings: [
    {
      title: 'Status (Available First)',
      name: 'statusAsc',
      by: [
        {field: 'status', direction: 'asc'},
        {field: 'price', direction: 'desc'}
      ]
    },
    {
      title: 'Price (High to Low)',
      name: 'priceDesc',
      by: [{field: 'price', direction: 'desc'}]
    },
    {
      title: 'Recently Added',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}]
    },
  ],
})