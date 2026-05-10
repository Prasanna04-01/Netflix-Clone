"use client";

import { Suspense } from "react";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageWrapper } from "@/components/common";

/**
 * Search page that primarily acts as a wrapper for the SearchOverlay.
 * Using Suspense for useSearchParams() compatibility in App Router.
 */
export default function SearchPage() {
  return (
    <MainLayout>
      <PageWrapper>
        <Suspense fallback={<div className="min-h-screen bg-netflix-black" />}>
          <SearchOverlay isOpen={true} onClose={() => {}} mode="page" />
        </Suspense>
      </PageWrapper>
    </MainLayout>
  );
}
