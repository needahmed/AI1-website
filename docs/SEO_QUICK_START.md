# SEO & Analytics Quick Start Guide

This guide will help you quickly set up and verify the SEO and analytics features.

## 5-Minute Setup

### 1. Environment Variables

Create or update your `.env.local` file:

```env
# Site URL (REQUIRED)
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Update for production

# Google Analytics (OPTIONAL - for tracking)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console (OPTIONAL - for verification)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code_here
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Verify Core Features

Open your browser and check:

1. **Sitemap**: http://localhost:3000/sitemap.xml
   - Should show list of all pages
   - Includes dynamic blog posts and portfolio projects

2. **Robots**: http://localhost:3000/robots.txt
   - Should allow search engines
   - References sitemap location

3. **Consent Banner**:
   - Should appear after 1 second on first visit
   - Test Accept/Decline buttons
   - Verify it doesn't reappear after choice

4. **Metadata** (check in browser DevTools):
   - View page source on any page
   - Look for `<meta>` tags
   - Verify OpenGraph tags (`og:title`, `og:description`, etc.)
   - Check JSON-LD structured data

## Production Setup

### 1. Google Analytics

1. Create account at https://analytics.google.com/
2. Create new property for your website
3. Copy the Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### 2. Google Search Console

1. Go to https://search.google.com/search-console
2. Add your property (domain or URL prefix)
3. Choose HTML tag verification method
4. Copy the verification code
5. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_code_here
   ```
6. Click "Verify" in Search Console
7. Submit your sitemap: `https://yourdomain.com/sitemap.xml`

### 3. Social Media Images

Create and add to `public` folder:

1. **og-image.jpg** (1200x630px)
   - Used for social media previews
   - Should represent your brand

2. **logo.png** (recommended: 512x512px or larger)
   - Used in structured data
   - Should be square format

### 4. Update Site URL

In production `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Testing Checklist

### Before Launch

- [ ] Test sitemap.xml loads correctly
- [ ] Test robots.txt loads correctly
- [ ] Verify consent banner works
- [ ] Check social previews work
- [ ] Run Lighthouse audit (aim for 90+ in all categories)
- [ ] Test keyboard navigation
- [ ] Verify all images have alt text

### After Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Verify site ownership in Google Search Console
- [ ] Set up Google Analytics goals
- [ ] Monitor Analytics dashboard
- [ ] Check Search Console for indexing issues
- [ ] Review structured data in Search Console

## Common Issues & Fixes

### Sitemap Not Loading

**Issue**: `/sitemap.xml` returns 404

**Fix**:
- Ensure `app/sitemap.ts` exists
- Restart dev server: `npm run dev`
- Check build: `npm run build`

### Analytics Not Tracking

**Issue**: No data in Google Analytics

**Checks**:
1. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
2. Ensure consent banner was accepted
3. Check browser console for errors
4. Verify GA script is loading (check Network tab)
5. Wait 24-48 hours for data to appear

### Consent Banner Not Showing

**Issue**: Consent banner doesn't appear

**Checks**:
1. Clear localStorage: `localStorage.clear()`
2. Refresh the page
3. Check browser console for errors
4. Verify banner component is imported in layout

### Metadata Not Showing

**Issue**: Social preview doesn't show correct image/text

**Fixes**:
1. Clear social media cache:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
2. Verify `metadataBase` is set in root layout
3. Check image URLs are absolute (not relative)
4. Ensure images are accessible publicly

## Validation Tools

### SEO Tools

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

### Social Media Tools

- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/

### Performance Tools

- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

### Accessibility Tools

- **WAVE**: https://wave.webaim.org/
- **axe DevTools**: https://www.deque.com/axe/devtools/
- **Lighthouse** (built into Chrome DevTools)

## Quick Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production Build
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:seed          # Seed with sample data

# Testing
npm run lint             # Run ESLint
npm run test             # Run tests
```

## Next Steps

1. Read full documentation: `docs/SEO_ANALYTICS_ACCESSIBILITY.md`
2. Set up Google Analytics goals
3. Configure Search Console alerts
4. Plan content strategy for blog
5. Create portfolio case studies
6. Monitor performance metrics

## Support Resources

- **Documentation**: See `docs/` folder
- **Next.js Docs**: https://nextjs.org/docs
- **Google Search Central**: https://developers.google.com/search
- **Web.dev**: https://web.dev/

---

**Need Help?**
- Check the comprehensive documentation in `docs/SEO_ANALYTICS_ACCESSIBILITY.md`
- Review Next.js metadata documentation
- Test with validation tools listed above
