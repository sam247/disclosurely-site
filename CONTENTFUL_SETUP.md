# Contentful Blog Setup

## Current Status

✅ **Blog is fully configured and ready to use!**

- Blog listing page: `/blog`
- Individual blog posts: `/blog/[slug]`
- Blog section on homepage: Shows latest 3 posts
- Contentful integration: Complete with 7 published posts available

## Environment Variables Required

Set these in your Vercel project settings (or `.env.local` for local development):

```bash
# Option 1: Standard Next.js naming (recommended)
CONTENTFUL_SPACE_ID=rm7hib748uv7
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token_here

# Option 2: Vite naming (backward compatible)
VITE_CONTENTFUL_SPACE_ID=rm7hib748uv7
VITE_CONTENTFUL_DELIVERY_TOKEN=your_delivery_token_here
```

**Note:** The code supports both naming conventions for backward compatibility.

## Contentful Space Details

- **Space ID:** `rm7hib748uv7`
- **Environment:** `master`
- **Content Type ID:** `9oYANGj5uBRT6UHsl5LxO` (Blog Post)
- **Published Posts:** 7 (verified via Contentful MCP)

## How to Get Your Delivery Token

1. Go to Contentful web app: https://app.contentful.com
2. Navigate to your space: `rm7hib748uv7`
3. Go to **Settings** → **API keys**
4. Create or use an existing **Content Delivery API** key
5. Copy the **Access token** value
6. Add it to your Vercel environment variables as `CONTENTFUL_DELIVERY_TOKEN`

## Blog Features

- ✅ Server-side rendering (SSR) for SEO
- ✅ Rich text content rendering
- ✅ Featured images
- ✅ Publish dates and reading time
- ✅ SEO metadata (title, description)
- ✅ Status filtering (only shows published posts)
- ✅ Automatic sorting by publish date (newest first)
- ✅ Homepage integration (shows latest 3 posts)
- ✅ Sitemap integration (all blog posts included)

## Testing Locally

1. Create `.env.local` file in the project root:
   ```bash
   CONTENTFUL_SPACE_ID=rm7hib748uv7
   CONTENTFUL_DELIVERY_TOKEN=your_token_here
   ```

2. Run the dev server:
   ```bash
   npm run dev
   ```

3. Visit:
   - Homepage: http://localhost:3000 (check blog section)
   - Blog listing: http://localhost:3000/blog
   - Individual post: http://localhost:3000/blog/[slug]

## Troubleshooting

**Blog posts not showing?**
- Check that `CONTENTFUL_DELIVERY_TOKEN` is set in Vercel
- Verify the token has read access to the space
- Check that posts have `status: "published"` in Contentful
- Check browser console and Vercel logs for errors

**API route returning empty array?**
- Verify environment variables are set correctly
- Check that the Contentful client is initialized (not null)
- Ensure posts exist and are published in Contentful

## Contentful MCP Access

The Contentful MCP is already configured and can be used to:
- View blog posts
- Create new blog posts
- Update existing posts
- Manage content

However, **environment variables must still be set in Vercel** for the Next.js app to fetch content at runtime.

