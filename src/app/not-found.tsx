import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageWrapper, Container, EmptyState } from "@/components/common";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <PageWrapper>
        <Container className="flex min-h-screen items-center justify-center pt-28 pb-20">
          <EmptyState
            title="Page Not Found"
            description="The requested page or movie could not be resolved. Check the URL or return to the main catalog."
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-netflix-red px-6 py-2.5 text-base font-semibold text-white transition-all duration-200 hover:bg-red-700"
            >
              Back to Home
            </Link>
          </EmptyState>
        </Container>
      </PageWrapper>
    </MainLayout>
  );
}
