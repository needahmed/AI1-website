"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

interface SocialSharingProps {
  title: string;
  url: string;
}

export function SocialSharing({ title, url }: SocialSharingProps) {
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      
      <Button
        variant="outline"
        size="icon"
        asChild
        onClick={(e) => {
          e.preventDefault();
          window.open(shareUrls.twitter, "_blank", "width=600,height=400");
        }}
      >
        <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="icon"
        asChild
        onClick={(e) => {
          e.preventDefault();
          window.open(shareUrls.facebook, "_blank", "width=600,height=400");
        }}
      >
        <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook className="h-4 w-4" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="icon"
        asChild
        onClick={(e) => {
          e.preventDefault();
          window.open(shareUrls.linkedin, "_blank", "width=600,height=400");
        }}
      >
        <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>

      <Button variant="outline" size="icon" onClick={copyToClipboard}>
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}
