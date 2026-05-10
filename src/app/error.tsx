"use client";

import { useEffect } from "react";
import { Container, Button, ErrorState } from "@/components/common";
import { MainLayout } from "@/components/layout/MainLayout";
import { RotateCcw } from "lucide-react";

/**
 * Global error boundary for the homepage.
 */
export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Home Route Error:", error);
  }, [error]);

  return (
    <MainLayout>
      <Container className="flex min-h-[70vh] items-center justify-center">
        <ErrorState
          title="Something went wrong"
          description="We couldn't load the cinematic experience. Please try again."
          onRetry={() => reset()}
        />
      </Container>
    </MainLayout>
  );
}
