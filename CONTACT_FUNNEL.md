# Contact Funnel Implementation

This document describes the complete contact funnel implementation including the contact page, form handling, email notifications, and chatbot integration.

## Features

### 1. Contact Page (`/contact`)

A comprehensive contact page with the following sections:

- **Hero Section**: Eye-catching hero with 6-hour response guarantee badge
- **Contact Details**: Cards displaying email, phone, address, and business hours
- **6-Hour Turnaround CTA**: Prominent call-to-action with scroll zoom animation
- **Contact Form**: Full-featured lead capture form
- **FAQ Section**: Accordion-based frequently asked questions

### 2. Contact Form

Located at `/contact`, the form captures:

- **Name** (required)
- **Email** (required)
- **Phone** (optional)
- **Company** (optional)
- **Project Type** (required) - Web Development, Mobile App, E-commerce, Branding, Consultation, Other
- **Budget Range** (required) - Various ranges from Under $5K to Above $50K
- **Message** (required, min 10 characters)

#### Form Features

- **Client-side validation**: Real-time validation using Zod schema
- **Server-side validation**: Validation in server action before DB insert
- **Loading states**: Button shows spinner during submission
- **Success/Failure UI**: 
  - Success: Displays success message with checkmark icon
  - Failure: Shows error toast with description
- **Form reset**: Auto-resets after successful submission

### 3. Email Notifications

Uses Resend API to send two emails on form submission:

#### Confirmation Email (to user)
- Professional branded template
- 6-hour response guarantee highlighted
- Link to portfolio
- Sent from: `FROM_EMAIL` env variable
- Subject: "Thank You for Contacting AI1 - We'll Respond Within 6 Hours!"

#### Notification Email (to agency)
- Contains all submission details
- Urgent action reminder (6-hour promise)
- Click-to-call and click-to-email links
- Link to admin dashboard
- Sent to: `AGENCY_EMAIL` env variable
- Reply-to: User's email address

### 4. Database Storage

All submissions are stored in MongoDB via Prisma:

```typescript
model ContactSubmission {
  id          String           @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  email       String
  phone       String?
  company     String?
  projectType ProjectType
  budgetRange BudgetRange
  message     String
  status      SubmissionStatus @default(PENDING)
  createdAt   DateTime         @default(now())
}
```

### 5. Chatbot Integration

#### Tawk.to Widget
- Client-side only (no SSR)
- Lazy loads with Next.js Script component
- Conditionally rendered based on consent

#### Consent Management
- Banner shown on first visit
- User choice stored in localStorage
- Options: "Enable Chat" or "No Thanks"
- Privacy-first approach (no tracking without consent)
- Page reload required after accepting to initialize widget

### 6. Animations & Accessibility

#### Animations
- Hero section: Fade-in with stagger effect
- CTA section: Scroll-triggered zoom effect using Framer Motion
- Contact details: Hover effects with shadow transitions
- Form submission: Loading spinner and success animation

#### Accessibility
- Reduced motion support via CSS media queries
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all form fields

## File Structure

```
app/
  contact/
    page.tsx                      # Main contact page

components/
  contact/
    contact-hero.tsx              # Hero section with badge
    contact-details.tsx           # Contact info cards
    contact-form.tsx              # Form with validation
    contact-cta.tsx               # 6-hour CTA with scroll zoom
    contact-faq.tsx               # FAQ accordion
    index.ts                      # Exports
  
  chat/
    chatbot-widget.tsx            # Tawk.to integration + consent banner
    index.ts                      # Exports
  
  ui/
    sonner.tsx                    # Toast notifications

lib/
  email/
    resend.ts                     # Resend client initialization
    templates.tsx                 # Email HTML templates
    send.ts                       # Email sending logic
    index.ts                      # Exports
  
  actions/
    contact.ts                    # Server action (enhanced with emails)
  
  repositories/
    contact.ts                    # Database operations
  
  schemas/
    index.ts                      # Zod validation schemas
```

## Environment Variables

Add these to your `.env.local` file:

```bash
# Email - Resend API
RESEND_API_KEY=re_your_api_key_here
AGENCY_EMAIL=agency@ai1.com
FROM_EMAIL=noreply@ai1.com

# Chat Widget - Tawk.to
NEXT_PUBLIC_TAWKTO_PROPERTY_ID=your_property_id_here
NEXT_PUBLIC_TAWKTO_WIDGET_ID=your_widget_id_here
```

### Getting API Keys

#### Resend
1. Sign up at https://resend.com
2. Verify your domain (or use their test domain for development)
3. Generate an API key from the dashboard
4. Add to `RESEND_API_KEY`

#### Tawk.to
1. Sign up at https://tawk.to
2. Create a new property
3. Get Property ID and Widget ID from the widget code
4. Add to environment variables

## Usage

### Accessing the Contact Page

Navigate to `/contact` or click "Contact" in the header or "Get Started" button.

### Testing Form Submission

1. Fill out all required fields
2. Click "Send Message"
3. Check for success toast notification
4. Verify email arrival (if configured)
5. Check database for submission

### Testing Chat Widget

1. Visit any page on the site
2. Accept chat consent when banner appears
3. Page will reload and chat widget will appear
4. Widget loads in bottom-right corner

### Viewing Submissions

Submissions can be viewed via:
- Direct database access (Prisma Studio: `npm run db:studio`)
- Future admin dashboard (link provided in notification emails)

## Server Action Flow

```typescript
submitContactFormAction(input)
  ↓
createContactSubmission(input)  // Validate + save to DB
  ↓
sendContactEmails(submission)   // Send emails (non-blocking)
  ↓ (parallel)
  ├─ Send confirmation to user
  └─ Send notification to agency
  ↓
Return success response
```

## Error Handling

### Form Validation Errors
- Displayed inline below each field
- Prevents submission until resolved
- Clear, user-friendly messages

### Server Errors
- Caught in server action
- Displayed as toast notification
- Logged for debugging
- Form remains filled for retry

### Email Errors
- Don't block form submission
- Logged on server
- User still receives success message
- Agency notified via logs

## Customization

### Contact Details
Edit `components/contact/contact-details.tsx`:
```typescript
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "your-email@domain.com",
    href: "mailto:your-email@domain.com",
  },
  // ... more items
];
```

### FAQ Content
Edit `components/contact/contact-faq.tsx`:
```typescript
const faqs = [
  {
    question: "Your question?",
    answer: "Your answer...",
  },
  // ... more FAQs
];
```

### Email Templates
Edit `lib/email/templates.tsx` to customize:
- HTML structure
- Styling
- Content
- Branding

### Form Fields
Edit schema in `lib/schemas/index.ts`:
```typescript
export const createContactSubmissionSchema = z.object({
  // Add/modify fields here
});
```

Then update:
1. Prisma schema (`prisma/schema.prisma`)
2. Form component (`components/contact/contact-form.tsx`)
3. Email templates if needed

## Acceptance Criteria Status

✅ **Contact form submits successfully**
- Form validation (client + server)
- Data persists to MongoDB
- Server action returns proper response

✅ **Sends emails**
- Confirmation email to user
- Notification email to agency
- Uses Resend API
- Error handling implemented

✅ **Surfaces validation errors**
- Inline field errors
- Toast notifications for server errors
- Clear, actionable messages

✅ **Chat widget loads only in browser**
- Client-side component only
- No SSR issues
- Uses Next.js Script component

✅ **Respects privacy**
- Consent banner on first visit
- User choice stored in localStorage
- Widget only loads after consent

✅ **Page animations consistent with brand**
- Uses existing animation utilities
- Framer Motion for scroll effects
- Matches AI1 design system

✅ **Accessible to reduced motion users**
- CSS media query support
- Animations can be disabled
- Core functionality works without animations

✅ **Submissions viewable in DB**
- Stored in ContactSubmission model
- Accessible via Prisma Studio
- Includes all form fields + status + timestamp

## Future Enhancements

- Admin dashboard for managing submissions
- Email threading/reply tracking
- SMS notifications option
- Webhook integrations
- A/B testing for form variants
- Analytics tracking
- Multi-language support
- File upload capability
- Calendar integration for scheduling
