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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check for chat consent in localStorage
    const consent = localStorage.getItem("chat-consent");
    if (consent === "accepted") {
      setHasConsent(true);
    }
  }, []);

  const shouldLoad = !!hasConsent && !!tawkToPropertyId && !!tawkToWidgetId;
  const tawkToUrl = `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`;

  useEffect(() => {
    if (!hasConsent) return;

    // Hide chat by default; we'll reveal only when ready
    document.body.classList.remove("chat-ready");

    // Safety timeout in case script loads but widget fails to init
    const timeoutId = window.setTimeout(() => {
      setIsReady(false);
      document.body.classList.remove("chat-ready");
    }, 15000);

    // Tawk exposes Tawk_API when ready; we poll briefly after script load
    function tryMarkReady() {
      const api = (window as any).Tawk_API;
      const loaded = (window as any).Tawk_LoadStart;
      if (api && typeof api.onLoad === "function") {
        api.onLoad = function () {
          window.clearTimeout(timeoutId);
          setIsReady(true);
          document.body.classList.add("chat-ready");
        };
      }
    }

    const pollId = window.setInterval(tryMarkReady, 300);
    // Try immediately as well
    tryMarkReady();

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(pollId);
      document.body.classList.remove("chat-ready");
    };
  }, [hasConsent]);

  return shouldLoad ? (
    <Script
      id="tawk-to-script"
      strategy="lazyOnload"
      src={tawkToUrl}
      onLoad={() => {
        // Script fetched; readiness handled by effect via Tawk_API.onLoad
      }}
      onError={(e) => {
        console.error("Failed to load Tawk.to chat widget", e);
        setIsReady(false);
        document.body.classList.remove("chat-ready");
      }}
    />
  ) : null;
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
      className="fixed bottom-4 right-4 z-50 w-[90vw] max-w-md sm:w-auto sm:min-w-[400px] sm:max-w-lg rounded-lg border border-border bg-background p-4 shadow-lg"
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
