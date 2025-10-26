"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface ChatbotWidgetProps {
  tawkToPropertyId?: string;
  tawkToWidgetId?: string;
}

/**
 * Chatbot widget component that loads Tawk.to script
 * Only loads client-side with consent management
 */
export function ChatbotWidget({
  tawkToPropertyId = process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID,
  tawkToWidgetId = process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID,
}: ChatbotWidgetProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for chat consent in localStorage
    const consent = localStorage.getItem("chat-consent");
    if (consent === "accepted") {
      setHasConsent(true);
    }
  }, []);

  // Don't load if no consent or missing configuration
  if (!hasConsent || !tawkToPropertyId || !tawkToWidgetId) {
    return null;
  }

  const tawkToUrl = `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`;

  return (
    <>
      <Script
        id="tawk-to-script"
        strategy="lazyOnload"
        src={tawkToUrl}
        onLoad={() => {
          setIsLoaded(true);
          console.log("Tawk.to chat widget loaded");
        }}
        onError={(e) => {
          console.error("Failed to load Tawk.to chat widget", e);
        }}
      />
    </>
  );
}

/**
 * Chat consent banner component
 */
export function ChatConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only show banner if consent hasn't been set
    const consent = localStorage.getItem("chat-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("chat-consent", "accepted");
    setShowBanner(false);
    // Reload to initialize chat widget
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem("chat-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-border bg-background p-4 shadow-lg"
      role="dialog"
      aria-labelledby="chat-consent-title"
    >
      <h3 id="chat-consent-title" className="mb-2 font-semibold">
        Enable Live Chat?
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        We use Tawk.to to provide instant support. Would you like to enable live chat?
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="flex-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Enable Chat
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          No Thanks
        </button>
      </div>
    </div>
  );
}
