import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Vanguard Builders CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  
  basePath: '/admin',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            S.listItem()
              .title('Luxury Home Inventory')
              .child(
                S.documentList()
                  .title('Available Homes')
                  .filter('_type == "luxuryHome"')
                  .apiVersion('2024-01-01')
                  .defaultOrdering([
                    {field: 'status', direction: 'asc'},
                    {field: 'price', direction: 'desc'}
                  ])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['luxuryHome'].includes(listItem.getId()!)
            ),
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
  
  document: {
    productionUrl: async (prev, context) => {
      const {document} = context
      if (document._type === 'luxuryHome' && document.slug && typeof document.slug === 'object' && 'current' in document.slug) {
        return `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/inventory/${document.slug.current}`
      }
      return prev
    },
  },
  
  tools: (prev) => {
    if (process.env.NODE_ENV === 'development') {
      return prev
    }
    return prev.filter((tool) => tool.name !== 'vision')
  },
})