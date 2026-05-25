"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, Bell, User } from "lucide-react";
import { motion } from "framer-motion";
import { NAV_ITEMS, ROUTES } from "@/constants/navigation";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/utils/cn";
import { Container } from "@/components/common";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "@/components/search/SearchOverlay";

/**
 * Premium cinematic Navbar with scroll behavior and responsive design.
 */
export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isScrolled = useScroll(20);
  const pathname = usePathname();

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-500 ease-in-out",
          isScrolled 
            ? "bg-nexora-black/95 backdrop-blur-md shadow-lg py-3" 
            : "bg-gradient-to-b from-black/80 to-transparent py-5"
        )}
      >
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-10">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 lg:hidden text-white hover:opacity-80 transition-opacity"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link 
              href={ROUTES.HOME} 
              className="text-2xl lg:text-3xl font-black italic tracking-tighter nexora-logo-gradient"
            >
              NEXORA
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        isActive 
                          ? "text-white cursor-default" 
                          : "text-nexora-grey hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1 text-white hover:opacity-80 transition-opacity"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button 
              className="hidden sm:block p-1 text-white hover:opacity-80 transition-opacity"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button 
              className="p-1 text-white hover:opacity-80 transition-opacity"
              aria-label="Profile"
            >
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-nexora-red to-[#B20710] flex items-center justify-center font-bold text-xs shadow-lg shadow-nexora-red/20">
                N
              </div>
            </button>
          </div>
        </Container>
      </nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};
