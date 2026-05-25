import { movieService } from "@/services/movie.service";
import { Container, PageWrapper } from "@/components/common";
import { MainLayout } from "@/components/layout/MainLayout";
import { BackdropHeader } from "@/components/movie/BackdropHeader";
import { MovieMetadata } from "@/components/movie/MovieMetadata";
import { MovieTrailerSection } from "@/components/movie/MovieTrailerSection";
import { Plus, Share2 } from "lucide-react";
import Image from "next/image";
import { getPosterUrl, getBackdropUrl } from "@/utils/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { parseMovieId } from "@/utils/movie-route";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate dynamic metadata for the movie page.
 * Uses the cached movieService to ensure that if the same movie is fetched
 * in the page component, it will be a single network request.
 */
export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = parseMovieId(id);

  if (!movieId) return { title: "Movie Not Found | Nexora" };

  try {
    const movie = await movieService.getMovieDetails(movieId);
    
    return {
      title: movie.title || "Movie Details",
      description: movie.overview || "Stream this movie on Nexora",
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.backdrop_path ? [getBackdropUrl(movie.backdrop_path, "LARGE")] : [],
        type: "video.movie",
      },
      twitter: {
        card: "summary_large_image",
        title: movie.title,
        description: movie.overview,
      },
    };
  } catch (error) {
    // Return fallback metadata on API failure to prevent page crash
    return { 
      title: "Movie Details | Nexora",
      description: "Explore cinematic details on Nexora."
    };
  }
}

/**
 * Dynamic Movie Details Page (Server Component).
 * Implements an immersive cinematic layout with deep-fading backgrounds.
 * 
 * Performance: Uses React cache() via movieService to deduplicate data fetching
 * with generateMetadata().
 */
export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseMovieId(id);

  if (!movieId) notFound();

  try {
    const movie = await movieService.getMovieDetails(movieId);

    if (!movie) notFound();

    return (
      <MainLayout>
        <PageWrapper className="relative">
          <BackdropHeader backdropPath={movie.backdrop_path} title={movie.title} />

          <Container className="relative z-20 pt-[35vh] md:pt-[40vh] pb-20">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
              {/* Left Side: Poster (Desktop only) */}
              <div className="hidden md:block w-[240px] lg:w-[350px] shrink-0">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
                  <Image
                    src={getPosterUrl(movie.poster_path, "LARGE")}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 0vw, (max-width: 1200px) 300px, 400px"
                    priority
                  />
                </div>
              </div>

              {/* Right Side: Information */}
              <div className="flex-grow flex flex-col">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-2 tracking-tight">
                  {movie.title}
                </h1>
                
                {movie.tagline && (
                  <p className="text-lg md:text-xl text-nexora-red italic font-medium mb-6 opacity-90">
                    "{movie.tagline}"
                  </p>
                )}

                <div className="mb-8">
                  <MovieMetadata
                    rating={movie.vote_average}
                    releaseDate={movie.release_date || ""}
                    runtime={movie.runtime}
                    genres={movie.genres}
                    status={movie.status}
                    originalLanguage={movie.original_language as string}
                  />
                </div>

                <div className="mb-10">
                  <MovieTrailerSection
                    movieId={movieId}
                    title={movie.title}
                  />
                </div>

                <div className="flex flex-wrap gap-4 mb-10">
                  <button className="flex items-center justify-center p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-white group">
                    <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="flex items-center justify-center p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-white group">
                    <Share2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
                    <p className="text-lg text-white/80 leading-relaxed max-w-4xl">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </PageWrapper>
      </MainLayout>
    );
  } catch (error) {
    // If API fails, show not found or a custom error state
    console.error(`[MoviePage] Error loading movie ${movieId}:`, error);
    notFound();
  }
}
