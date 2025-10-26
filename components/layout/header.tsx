"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  { name: "Web & App Development", href: "/services/web-app-development" },
  { name: "Game Development", href: "/services/game-development" },
  { name: "AI Solutions & Automations", href: "/services/ai-solutions" },
  { name: "SEO Services", href: "/services/seo-services" },
  { name: "Branding & UI/UX", href: "/services/branding-uiux" },
];

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 0.8]);

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40">
      <motion.div
        className="absolute inset-0 bg-background backdrop-blur-lg"
        style={{ opacity }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="gradient-text text-2xl font-heading font-bold">
              AI1
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button
                variant={isActivePath("/") ? "default" : "ghost"}
                className="font-medium"
              >
                Home
              </Button>
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={
                    isActivePath("/services") ? "default" : "ghost"
                  }
                  className="font-medium"
                >
                  Services
                  <ChevronDown className="ml-1 size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {services.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link
                      href={service.href}
                      className="w-full cursor-pointer"
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/portfolio">
              <Button
                variant={isActivePath("/portfolio") ? "default" : "ghost"}
                className="font-medium"
              >
                Portfolio
              </Button>
            </Link>

            <Link href="/about">
              <Button
                variant={isActivePath("/about") ? "default" : "ghost"}
                className="font-medium"
              >
                About
              </Button>
            </Link>

            <Link href="/blog">
              <Button
                variant={isActivePath("/blog") ? "default" : "ghost"}
                className="font-medium"
              >
                Blog
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant={isActivePath("/contact") ? "default" : "ghost"}
                className="font-medium"
              >
                Contact
              </Button>
            </Link>
          </nav>

          {/* CTA and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/contact" className="hidden md:block">
              <Button
                variant="default"
                className="gradient-ai1 border-0 font-semibold"
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>
                    <span className="gradient-text text-2xl font-heading font-bold">
                      AI1
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={isActivePath(link.href) ? "default" : "ghost"}
                        className="w-full justify-start font-medium"
                      >
                        {link.name}
                      </Button>
                    </Link>
                  ))}

                  {/* Services in Mobile */}
                  <div className="space-y-2">
                    <p className="px-4 text-sm font-semibold text-muted-foreground">
                      Services
                    </p>
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant={
                            isActivePath(service.href) ? "default" : "ghost"
                          }
                          className="w-full justify-start pl-8"
                        >
                          {service.name}
                        </Button>
                      </Link>
                    ))}
                  </div>

                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="default"
                      className="w-full gradient-ai1 border-0 font-semibold"
                    >
                      Get Started
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
