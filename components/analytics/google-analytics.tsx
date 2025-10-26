"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId = GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for consent in localStorage
    const storedConsent = localStorage.getItem("analytics-consent");
    if (storedConsent !== null) {
      setConsent(storedConsent === "true");
    }

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent<{ analytics: boolean }>) => {
      setConsent(event.detail.analytics);
    };

    window.addEventListener("consent-changed", handleConsentChange as EventListener);
    return () => {
      window.removeEventListener("consent-changed", handleConsentChange as EventListener);
    };
  }, []);

  // Don't load GA if no measurement ID or consent not granted
  if (!measurementId || consent === false) {
    return null;
  }

  // Don't render anything until we've checked consent (unless consent is granted)
  if (consent === null) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
