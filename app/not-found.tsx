import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ai1";

export default function NotFound() {
  return (
    <SectionWrapper className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 max-w-5xl mx-auto px-4">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="gradient-text text-9xl font-heading font-bold">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-electric-blue via-purple to-cyan" />
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/">
            <Button size="lg" className="gradient-ai1 border-0 font-semibold">
              <Home className="mr-2 size-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              <Search className="mr-2 size-4" />
              Get Help
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-border max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">
            Here are some helpful links instead:
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/services"
              className="text-sm text-electric-blue hover:underline"
            >
              Our Services
            </Link>
            <Link
              href="/portfolio"
              className="text-sm text-electric-blue hover:underline"
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className="text-sm text-electric-blue hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className="text-sm text-electric-blue hover:underline"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
