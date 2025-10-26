import type { ContactSubmission, ProjectType, BudgetRange } from "@prisma/client";

// Helper to format budget range
const formatBudgetRange = (range: BudgetRange): string => {
  const budgetMap: Record<BudgetRange, string> = {
    UNDER_5K: "Under $5,000",
    RANGE_5K_10K: "$5,000 - $10,000",
    RANGE_10K_25K: "$10,000 - $25,000",
    RANGE_25K_50K: "$25,000 - $50,000",
    ABOVE_50K: "Above $50,000",
  };
  return budgetMap[range];
};

// Helper to format project type
const formatProjectType = (type: ProjectType): string => {
  const typeMap: Record<ProjectType, string> = {
    WEB_DEVELOPMENT: "Web Development",
    MOBILE_APP: "Mobile App",
    ECOMMERCE: "E-commerce",
    BRANDING: "Branding",
    CONSULTATION: "Consultation",
    OTHER: "Other",
  };
  return typeMap[type];
};

// Confirmation email to user
export const getConfirmationEmailHtml = (name: string): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
      }
      .container {
        background: white;
        border-radius: 8px;
        padding: 40px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .logo {
        font-size: 32px;
        font-weight: bold;
        background: linear-gradient(135deg, #0047FF 0%, #00D4FF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      h1 {
        color: #0047FF;
        font-size: 24px;
        margin-bottom: 16px;
      }
      .content {
        margin: 20px 0;
      }
      .highlight {
        background: #E6F2FF;
        border-left: 4px solid #0047FF;
        padding: 16px;
        margin: 20px 0;
        border-radius: 4px;
      }
      .footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        text-align: center;
        font-size: 14px;
        color: #666;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background: linear-gradient(135deg, #0047FF 0%, #00D4FF 100%);
        color: white;
        text-decoration: none;
        border-radius: 6px;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">AI1</div>
      </div>
      
      <h1>Thank You for Reaching Out! 🎉</h1>
      
      <div class="content">
        <p>Hi ${name},</p>
        
        <p>
          We've received your inquiry and we're excited to learn more about your project! 
          Our team is reviewing your submission and will get back to you shortly.
        </p>
        
        <div class="highlight">
          <strong>⚡ 6-Hour Turnaround Promise</strong>
          <p style="margin: 8px 0 0 0;">
            We pride ourselves on rapid response times. You can expect to hear from our team 
            within the next 6 hours during business hours (Mon-Fri, 9AM-5PM EST).
          </p>
        </div>
        
        <p>
          In the meantime, feel free to explore our portfolio and learn more about how we've 
          helped businesses like yours achieve their goals.
        </p>
        
        <div style="text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://ai1.com"}" class="button">
            View Our Portfolio
          </a>
        </div>
      </div>
      
      <div class="footer">
        <p>
          <strong>AI1 - AI-Powered Solutions</strong><br />
          Leading the future with cutting-edge technology
        </p>
        <p style="font-size: 12px; margin-top: 10px;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    </div>
  </body>
</html>
`;

// Notification email to agency
export const getNotificationEmailHtml = (
  submission: Omit<ContactSubmission, "status">
): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
      }
      .container {
        background: white;
        border-radius: 8px;
        padding: 40px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(135deg, #0047FF 0%, #00D4FF 100%);
        color: white;
        padding: 20px;
        border-radius: 6px;
        margin-bottom: 30px;
      }
      h1 {
        margin: 0;
        font-size: 24px;
      }
      .info-row {
        display: flex;
        padding: 12px 0;
        border-bottom: 1px solid #eee;
      }
      .info-label {
        font-weight: 600;
        width: 150px;
        color: #666;
      }
      .info-value {
        flex: 1;
        color: #333;
      }
      .message-box {
        background: #f9f9f9;
        padding: 20px;
        border-radius: 6px;
        margin-top: 20px;
        border-left: 4px solid #0047FF;
      }
      .urgent {
        background: #FFF3E0;
        border-left: 4px solid #FF9800;
        padding: 16px;
        border-radius: 4px;
        margin: 20px 0;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background: linear-gradient(135deg, #0047FF 0%, #00D4FF 100%);
        color: white;
        text-decoration: none;
        border-radius: 6px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🎯 New Contact Form Submission</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9;">
          Received: ${new Date(submission.createdAt).toLocaleString()}
        </p>
      </div>
      
      <div class="urgent">
        <strong>⏰ Action Required:</strong> Please respond within 6 hours to maintain our service promise.
      </div>
      
      <div>
        <div class="info-row">
          <div class="info-label">Name:</div>
          <div class="info-value"><strong>${submission.name}</strong></div>
        </div>
        
        <div class="info-row">
          <div class="info-label">Email:</div>
          <div class="info-value">
            <a href="mailto:${submission.email}">${submission.email}</a>
          </div>
        </div>
        
        ${submission.phone ? `
        <div class="info-row">
          <div class="info-label">Phone:</div>
          <div class="info-value">
            <a href="tel:${submission.phone}">${submission.phone}</a>
          </div>
        </div>
        ` : ''}
        
        ${submission.company ? `
        <div class="info-row">
          <div class="info-label">Company:</div>
          <div class="info-value">${submission.company}</div>
        </div>
        ` : ''}
        
        <div class="info-row">
          <div class="info-label">Project Type:</div>
          <div class="info-value">${formatProjectType(submission.projectType)}</div>
        </div>
        
        <div class="info-row">
          <div class="info-label">Budget:</div>
          <div class="info-value">${formatBudgetRange(submission.budgetRange)}</div>
        </div>
      </div>
      
      <div class="message-box">
        <strong style="display: block; margin-bottom: 12px;">Message:</strong>
        <p style="margin: 0; white-space: pre-wrap;">${submission.message}</p>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 6px; text-align: center;">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Submission ID: ${submission.id}</p>
        <a 
          href="${process.env.NEXT_PUBLIC_SITE_URL || "https://ai1.com"}/admin/submissions/${submission.id}"
          class="button"
        >
          View in Dashboard
        </a>
      </div>
    </div>
  </body>
</html>
`;
