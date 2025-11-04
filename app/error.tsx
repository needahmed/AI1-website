"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ai1";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SectionWrapper className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 max-w-5xl mx-auto px-4">
        {/* Error Icon */}
        <div className="relative inline-block">
          <div className="relative z-10">
            <AlertTriangle className="size-24 text-destructive mx-auto" />
          </div>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-destructive to-purple" />
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Something Went Wrong
          </h1>
          <p className="text-lg text-muted-foreground max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-0">
            We encountered an unexpected error. Don't worry, our team has been
            notified and we're working on a fix.
          </p>
        </div>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-left max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-0">
            <p className="text-sm font-mono text-destructive break-words">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            onClick={reset}
            className="gradient-ai1 border-0 font-semibold"
          >
            <RefreshCcw className="mr-2 size-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline">
              <Home className="mr-2 size-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Support */}
        <div className="pt-8 border-t border-border max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-0">
          <p className="text-sm text-muted-foreground mb-2">
            If the problem persists, please contact our support team
          </p>
          <Link href="/contact">
            <Button variant="ghost" size="sm">
              Contact Support →
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
