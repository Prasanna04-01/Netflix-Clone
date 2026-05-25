import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageWrapper, Container, EmptyState } from "@/components/common";

export default function TvShowsPage() {
  return (
    <MainLayout>
      <PageWrapper>
        <Container className="flex min-h-screen items-center justify-center pt-28 pb-20">
          <EmptyState
            title="TV Shows"
            description="TV-focused browsing is being expanded. Featured picks remain available from the home experience."
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-nexora-red px-6 py-2.5 text-base font-semibold text-white transition-all duration-200 hover:bg-red-700"
            >
              Back to Home
            </Link>
          </EmptyState>
        </Container>
      </PageWrapper>
    </MainLayout>
  );
}
