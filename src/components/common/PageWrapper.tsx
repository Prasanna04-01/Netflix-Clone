"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeIn } from "@/constants/animations";
import { cn } from "@/utils/cn";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * PageWrapper provides consistent entry animations for all pages.
 * Enhances the cinematic feel with smooth transitions.
 */
export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className={cn("min-h-screen w-full", className)}
    >
      {children}
    </motion.div>
  );
};
