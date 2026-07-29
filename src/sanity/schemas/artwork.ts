import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Originals', value: 'Originals' },
          { title: 'Prints & Posters', value: 'Prints & Posters' },
          { title: 'Commissions', value: 'Commissions' },
          { title: 'Home Decor', value: 'Home Decor' },
          { title: 'Painted Bags', value: 'Painted Bags' },
          { title: 'Handmade Cards', value: 'Handmade Cards' },
          { title: 'Painted Tees', value: 'Painted Tees' },
          { title: 'Portraits', value: 'Portraits' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      rows: 5,
      description: 'The story behind this artwork',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload an image OR use an external URL below',
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'External Image URL',
      type: 'url',
      description: 'Google Drive or other external image URL (used if no image is uploaded)',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images (Multiple Angles)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'externalGalleryUrls',
      title: 'External Gallery URLs',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'External image URLs for gallery (used if no gallery images uploaded)',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Leave empty for "Price on Request"',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g., Charcoal & Watercolor on Paper',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      initialValue: 'Customizable',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = appears first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
