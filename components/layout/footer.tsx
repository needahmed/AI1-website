"use client";

import * as React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Shield,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
];

const services = [
  { name: "AI Development", href: "/services/ai-development" },
  { name: "Web Development", href: "/services/web-development" },
  { name: "Mobile Apps", href: "/services/mobile-apps" },
  { name: "Consulting", href: "/services/consulting" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

const certifications = [
  { name: "ISO 27001", icon: Shield },
  { name: "SOC 2", icon: Award },
  { name: "GDPR Compliant", icon: CheckCircle2 },
];

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add newsletter signup logic here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="gradient-text text-3xl font-heading font-bold">
                AI1
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Leading the future of AI-powered solutions. We help businesses
              transform through cutting-edge technology and innovative
              strategies.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="size-4 text-electric-blue" />
                <a
                  href="mailto:hello@ai1.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  hello@ai1.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="size-4 text-electric-blue" />
                <a
                  href="tel:+1234567890"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="size-4 text-electric-blue" />
                <span className="text-muted-foreground">
                  123 AI Street, Tech City, TC 12345
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center size-9 rounded-md bg-muted hover:bg-electric-blue hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get updates on our latest projects and insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Certifications / Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-border">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <Badge
                key={cert.name}
                variant="outline"
                className="px-4 py-2 flex items-center gap-2"
              >
                <Icon className="size-4 text-electric-blue" />
                <span className="text-sm font-medium">{cert.name}</span>
              </Badge>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-border gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI1. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                >
                  {link.name}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-muted-foreground">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
