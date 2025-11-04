"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, Home, Briefcase, User, BookOpen, Mail, Sparkles } from "lucide-react";
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
  { name: "Web & App Development", href: "/services/web-app-development", icon: Sparkles },
  { name: "Game Development", href: "/services/game-development", icon: Sparkles },
  { name: "AI Solutions & Automations", href: "/services/ai-solutions", icon: Sparkles },
  { name: "SEO Services", href: "/services/seo-services", icon: Sparkles },
  { name: "Branding & UI/UX", href: "/services/branding-uiux", icon: Sparkles },
];

const navigationLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "About", href: "/about", icon: User },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
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
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
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
              <SheetContent 
                side="right" 
                className="w-80 p-0 overflow-y-auto bg-gradient-to-b from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/10"
              >
                {/* Header with logo and close */}
                <div className="sticky top-0 z-10 border-b border-border/50 bg-background/95 backdrop-blur-sm px-6 py-5">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="mb-0">
                      <span className="gradient-text text-2xl font-heading font-bold">
                        AI1
                      </span>
                    </SheetTitle>
                  </div>
                </div>

                {/* Navigation Content */}
                <div className="flex-1 px-4 py-6">
                  <nav className="flex flex-col space-y-1">
                    {/* Main Navigation Links */}
                    {navigationLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="group"
                        >
                          <Button
                            variant={isActivePath(link.href) ? "default" : "ghost"}
                            className={cn(
                              "w-full justify-start font-medium h-12 rounded-lg transition-all gap-3",
                              isActivePath(link.href)
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "hover:bg-muted/80 hover:text-foreground text-muted-foreground group-hover:translate-x-1"
                            )}
                          >
                            <Icon className="size-5" />
                            {link.name}
                          </Button>
                        </Link>
                      );
                    })}

                    {/* Divider */}
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    {/* Services Section */}
                    <div className="space-y-1">
                      <div className="px-3 py-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Services
                        </p>
                      </div>
                      {services.map((service) => {
                        const ServiceIcon = service.icon;
                        return (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setIsOpen(false)}
                            className="group"
                          >
                            <Button
                              variant={
                                isActivePath(service.href) ? "default" : "ghost"
                              }
                              className={cn(
                                "w-full justify-start h-11 rounded-lg pl-6 transition-all text-sm gap-3",
                                isActivePath(service.href)
                                  ? "bg-primary text-primary-foreground shadow-sm"
                                  : "hover:bg-muted/80 hover:text-foreground text-muted-foreground group-hover:translate-x-1"
                              )}
                            >
                              <ServiceIcon className="size-4 opacity-70" />
                              {service.name}
                            </Button>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Divider */}
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    {/* CTA Button */}
                    <Link 
                      href="/contact" 
                      onClick={() => setIsOpen(false)}
                      className="mt-2"
                    >
                      <Button
                        variant="default"
                        className="w-full gradient-ai1 border-0 font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
