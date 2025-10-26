# Blog Module Documentation

## Overview

The blog module provides a fully-featured blog system with MDX support, pagination, category filtering, SEO optimization, and more.

## Features

### Blog Index Page (`/blog`)
- **Pagination**: 9 posts per page with full pagination controls
- **Category Filters**: 
  - Web Development
  - AI
  - Game Dev
  - SEO
  - Industry Insights
- **Featured Post Hero**: Large hero display for featured blog posts
- **Animated Card Reveals**: Smooth animations using Framer Motion
- **Responsive Grid**: Adapts from 1 column (mobile) to 3 columns (desktop)

### Blog Post Page (`/blog/[slug]`)
- **Rich Content Rendering**: Markdown/MDX content with custom styling
- **Code Syntax Highlighting**: Using highlight.js with multiple language support
- **Table of Contents**: Auto-generated from H2 and H3 headings with active tracking
- **Related Posts**: Shows up to 3 related posts based on categories and tags
- **Author Bio**: Display author information with avatar and bio
- **Social Sharing**: Share to Twitter, Facebook, LinkedIn, or copy link
- **Reading Time**: Auto-calculated reading time estimate
- **Responsive Images**: Optimized with Next.js Image component

### SEO Features
- **Meta Tags**: Title, description, and keywords
- **Open Graph**: Full OG tags for social media sharing
- **Twitter Cards**: Large image cards for Twitter
- **JSON-LD Schema**: Article structured data for search engines
- **Semantic HTML**: Proper heading hierarchy and skip links for accessibility

### Data Management
- **Prisma Integration**: Full database support with MongoDB
- **Draft/Published States**: Posts only show if `publishedAt` is set and in the past
- **Fallback Sample Posts**: 5 sample posts available when database is empty
- **Type-Safe Operations**: Full TypeScript support with Prisma types

## Database Schema

The `BlogPost` model includes:
- `id`, `slug` (unique identifier)
- `title`, `excerpt`, `content`
- `author`, `authorBio`, `authorImage`
- `categories` (array of PostCategory enum)
- `tags` (array of strings)
- `publishedAt` (nullable DateTime for draft support)
- `featured` (boolean for hero display)
- `featuredImage` (nullable string URL)
- `seoMeta` (JSON for custom SEO fields)
- `readingTime` (integer, minutes)
- `createdAt`, `updatedAt`

### Categories
- `WEB_DEVELOPMENT`
- `AI`
- `GAME_DEV`
- `SEO`
- `INDUSTRY_INSIGHTS`
- `OTHER`

## Components

### Blog Components (`/components/blog/`)
- `BlogCard` - Individual blog post card with hover effects
- `FeaturedPostHero` - Large hero display for featured posts
- `CategoryFilter` - Category filter buttons
- `Pagination` - Smart pagination with page numbers
- `MarkdownContent` - Markdown renderer with syntax highlighting
- `TableOfContents` - Auto-generated TOC with active tracking
- `SocialSharing` - Social media share buttons
- `AuthorBio` - Author information card
- `RelatedPosts` - Grid of related blog posts

### Utilities (`/lib/blog-utils.ts`)
- `calculateReadingTime()` - Calculate reading time from content
- `formatCategory()` - Convert enum to display name
- `generateTableOfContents()` - Extract headings from markdown
- `getSampleBlogPosts()` - Get fallback sample posts

## Repository Functions (`/lib/repositories/blog.ts`)

### Query Functions
- `getPublishedBlogPosts(options?)` - Get paginated published posts with optional category filter
- `getFeaturedBlogPost()` - Get the latest featured post
- `getPublishedBlogPostBySlug(slug)` - Get single published post by slug
- `getBlogPostBySlug(slug)` - Get any post by slug (including drafts)
- `getBlogPostsByCategory(category)` - Get all published posts in a category
- `getRelatedBlogPosts(slug, limit?)` - Get related posts based on categories and tags
- `searchBlogPosts(searchTerm)` - Full-text search across title, excerpt, and content

### Mutation Functions
- `createBlogPost(input)` - Create new blog post with validation
- `updateBlogPost(slug, input)` - Update existing blog post
- `deleteBlogPost(slug)` - Delete blog post

All functions include:
- Input validation with Zod schemas
- Error handling with custom error types
- Comprehensive logging
- Cache revalidation

## Usage Examples

### Creating a Blog Post

```typescript
import { createBlogPost } from "@/lib/repositories/blog";
import { PostCategory } from "@prisma/client";

const post = await createBlogPost({
  slug: "my-awesome-post",
  title: "My Awesome Post",
  excerpt: "A brief description of the post",
  content: "## Full markdown content here...",
  author: "John Doe",
  authorBio: "Software developer and writer",
  authorImage: "https://example.com/avatar.jpg",
  categories: [PostCategory.WEB_DEVELOPMENT],
  tags: ["tutorial", "nextjs"],
  publishedAt: new Date(),
  featured: false,
  featuredImage: "https://example.com/featured.jpg",
  readingTime: 5,
});
```

### Querying Posts with Pagination

```typescript
import { getPublishedBlogPosts } from "@/lib/repositories/blog";
import { PostCategory } from "@prisma/client";

const result = await getPublishedBlogPosts({
  page: 1,
  limit: 9,
  category: PostCategory.AI, // optional
});

console.log(result.posts); // Array of posts
console.log(result.total); // Total count
console.log(result.totalPages); // Number of pages
```

### Server Actions

Server actions are available in `/lib/actions/blog.ts` for client-side data fetching:

```typescript
import { getPublishedBlogPostsAction } from "@/lib/actions/blog";

const result = await getPublishedBlogPostsAction({ 
  page: 1, 
  limit: 9 
});

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

## Seeding the Database

To seed the database with sample blog posts:

```bash
npm run db:seed
```

This will create 4 sample blog posts with:
- Various categories
- Complete content with code examples
- Featured images
- Author information
- SEO metadata

## Environment Variables

Add to your `.env.local`:

```bash
DATABASE_URL="mongodb+srv://..."
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

The `NEXT_PUBLIC_SITE_URL` is used for:
- Social sharing URLs
- JSON-LD canonical URLs
- Open Graph URLs

## Styling

The blog uses the AI1 design system with:
- Custom brand colors (`ai1-electric`, `ai1-cyan`, etc.)
- Typography scales from `globals.css`
- Glassmorphism effects (`glass-card`)
- Gradient utilities (`gradient-text`, `gradient-ai1`)
- Shadow utilities (`shadow-ai1`, `shadow-ai1-lg`)

### Markdown Styling

Markdown content is styled with Tailwind Typography plugin and custom classes:
- Proper heading hierarchy (h1-h6)
- Code blocks with syntax highlighting
- Responsive images
- Styled blockquotes
- Table support
- Link styling with brand colors

## Accessibility

The blog module follows WCAG 2.1 AA guidelines:
- **Skip Links**: "Skip to content" link at top of posts
- **Semantic HTML**: Proper use of article, header, nav, aside tags
- **Heading Hierarchy**: Logical heading structure (h1 → h2 → h3)
- **Alt Text**: All images require alt text
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus States**: Clear focus indicators on all interactive elements
- **ARIA Labels**: Proper ARIA labels on buttons and navigation

## Performance

- **Static Generation**: Blog index and posts are generated at build time when possible
- **Image Optimization**: Next.js Image component with remote patterns
- **Code Splitting**: Components are loaded only when needed
- **Lazy Loading**: Images and non-critical content lazy load
- **Cache Headers**: Proper cache headers for static assets

## Customization

### Adding New Categories

1. Update the enum in `prisma/schema.prisma`:
```prisma
enum PostCategory {
  WEB_DEVELOPMENT
  AI
  GAME_DEV
  SEO
  INDUSTRY_INSIGHTS
  YOUR_NEW_CATEGORY  // Add here
  OTHER
}
```

2. Run `npm run db:generate` to update Prisma client

3. Add display name in `lib/blog-utils.ts`:
```typescript
export function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    // ... existing categories
    YOUR_NEW_CATEGORY: "Your New Category",
  };
  return categoryMap[category] || category;
}
```

4. Add to filter in `components/blog/category-filter.tsx`:
```typescript
const categories = [
  // ... existing categories
  { value: "YOUR_NEW_CATEGORY", label: "Your New Category" },
];
```

### Customizing Markdown Rendering

Edit `components/blog/markdown-content.tsx` to:
- Add custom component rendering
- Modify styling for specific elements
- Add new syntax highlighting languages
- Customize code block appearance

### Customizing SEO

Edit the metadata generation in `app/blog/[slug]/page.tsx` to:
- Modify meta tag structure
- Add additional Open Graph properties
- Customize Twitter Card data
- Extend JSON-LD schema

## Testing

The blog module can be tested with:
- Sample posts (automatically provided as fallback)
- Seeded database posts
- Real production data

Access at:
- Blog index: `http://localhost:3000/blog`
- Sample post: `http://localhost:3000/blog/getting-started-with-next-js`
- Category filter: `http://localhost:3000/blog?category=WEB_DEVELOPMENT`
- Pagination: `http://localhost:3000/blog?page=2`

## Future Enhancements

Potential additions:
- Comment system
- Blog post reactions/likes
- Author pages
- Tag pages
- RSS feed
- Newsletter integration
- Search functionality
- Related posts algorithm improvements
- Reading progress indicator
- Estimated reading time per section
- Print stylesheet
- Dark mode optimized images
