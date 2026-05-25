import { ReactNode } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { cn } from "@/utils/cn";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * MainLayout provides the global structure for the platform.
 * Includes the Navbar and manages the content offset.
 */
export const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <div className="relative min-h-screen bg-nexora-black flex flex-col">
      <Navbar />
      <main className={cn("flex-grow", className)}>
        {children}
      </main>
      
      {/* Optional Footer can be added here later */}
    </div>
  );
};
