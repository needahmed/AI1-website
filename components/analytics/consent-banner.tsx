"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("analytics-consent");
    if (consent === null) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("analytics-consent", "true");
    setShowBanner(false);
    // Dispatch event to notify GA component
    window.dispatchEvent(
      new CustomEvent("consent-changed", { detail: { analytics: true } })
    );
  };

  const handleDecline = () => {
    localStorage.setItem("analytics-consent", "false");
    setShowBanner(false);
    // Dispatch event to notify GA component
    window.dispatchEvent(
      new CustomEvent("consent-changed", { detail: { analytics: false } })
    );
  };

  const handleClose = () => {
    // Treat close as decline
    handleDecline();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] md:left-auto md:right-4 md:max-w-md">
      <Card className="shadow-2xl border-2">
        <CardContent className="p-6 relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close consent banner"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="pr-6">
            <h3 className="font-bold text-lg mb-2">Cookie Consent</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We use analytics cookies to understand how you interact with our website and
              improve your experience. Your data is anonymous and secure.
            </p>

            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleAccept} size="sm" className="flex-1 min-w-[100px]">
                Accept
              </Button>
              <Button
                onClick={handleDecline}
                variant="outline"
                size="sm"
                className="flex-1 min-w-[100px]"
              >
                Decline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
