"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ai1.com",
    href: "mailto:hello@ai1.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Innovation Drive, Tech City, TC 12345",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon-Fri: 9AM - 5PM EST",
    href: null,
  },
];

export function ContactDetails() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {contactInfo.map((info) => {
        const Icon = info.icon;
        const content = (
          <Card className="group h-full transition-all hover:shadow-lg">
            <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
              <div className="rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">{info.label}</h3>
              <p className="text-sm text-muted-foreground">{info.value}</p>
            </CardContent>
          </Card>
        );

        if (info.href) {
          return (
            <a
              key={info.label}
              href={info.href}
              target={info.label === "Address" ? "_blank" : undefined}
              rel={info.label === "Address" ? "noopener noreferrer" : undefined}
              className="block"
            >
              {content}
            </a>
          );
        }

        return <div key={info.label}>{content}</div>;
      })}
    </div>
  );
}
