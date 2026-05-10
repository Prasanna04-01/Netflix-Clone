"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/utils/cn";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Mobile navigation drawer with Framer Motion animations.
 */
export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />

          {/* Menu Content */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] bg-netflix-black p-6 shadow-2xl lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-black italic tracking-tighter text-netflix-red">
                NETFLIX
              </span>
              <button
                onClick={onClose}
                className="p-1 text-netflix-grey hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <ul className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "text-lg font-bold transition-colors",
                        isActive ? "text-netflix-red" : "text-netflix-grey hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-netflix-red flex items-center justify-center font-bold text-sm">
                  N
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Netflix User</p>
                  <p className="text-netflix-grey text-xs">Premium Member</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
