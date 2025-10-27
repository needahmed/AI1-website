"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How quickly will I receive a response?",
    answer:
      "We pride ourselves on rapid response times. You can expect to hear from our team within 6 hours during business hours (Monday-Friday, 9AM-5PM EST). For inquiries received outside business hours, we'll respond first thing the next business day.",
  },
  {
    question: "What information should I include in my inquiry?",
    answer:
      "Please provide as much detail as possible about your project including your goals, timeline, budget range, and any specific requirements or challenges you're facing. The more information you share, the better we can understand your needs and provide a tailored solution.",
  },
  {
    question: "Do you offer free consultations?",
    answer:
      "Yes! We offer a complimentary 30-minute consultation to discuss your project needs, explore potential solutions, and determine if we're the right fit for your business. This is a no-obligation conversation to help you make an informed decision.",
  },
  {
    question: "What types of projects do you work on?",
    answer:
      "We specialize in web development, mobile apps, e-commerce solutions, branding, and AI-powered applications. Whether you need a complete digital transformation or a specific solution, our team has the expertise to bring your vision to life.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. During our initial consultation, we'll provide a detailed timeline specific to your project.",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "We believe in transparent, regular communication. You'll have a dedicated project manager as your main point of contact, weekly progress updates, and access to our project management platform where you can track progress, review deliverables, and provide feedback in real-time.",
  },
  {
    question: "What happens after I submit this form?",
    answer:
      "After submission, you'll receive an immediate confirmation email. Our team will review your inquiry and reach out within 6 hours to schedule a consultation. We'll discuss your needs in detail, answer any questions, and provide recommendations for next steps.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Absolutely! We work with businesses of all sizes, from startups and small businesses to enterprise organizations. We offer flexible engagement models and pricing to accommodate different budgets and project scopes.",
  },
];

export function ContactFAQ() {
  return (
    <div className="mx-auto max-w-5xl w-full px-4">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="w-full">
            <AccordionTrigger className="w-full text-left whitespace-normal wrap-break-word">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="w-full text-muted-foreground whitespace-normal wrap-break-word">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
