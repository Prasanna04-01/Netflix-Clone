"use client";

import { PageWrapper, Container } from "@/components/common";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroBanner } from "@/components/banner/HeroBanner";
import { MovieRow } from "@/components/movie/MovieRow";
import { movieService } from "@/services/movie.service";

export default function Home() {
  return (
    <MainLayout>
      <PageWrapper>
        {/* Dynamic Cinematic Hero Banner */}
        <HeroBanner />

        {/* Content Section with Movie Rows */}
        <div className="relative z-30 -mt-24 md:-mt-32 pb-20">
          <Container>
            {/* 1. Trending Now */}
            <MovieRow 
              title="Trending Now" 
              fetchAction={movieService.getTrendingMovies} 
            />

            {/* 2. Top Rated */}
            <MovieRow 
              title="Top Rated" 
              fetchAction={movieService.getTopRatedMovies} 
            />

            {/* 3. Popular Movies */}
            <MovieRow 
              title="Popular Movies" 
              fetchAction={movieService.getPopularMovies} 
            />

            {/* 4. Action Movies (Genre ID: 28) */}
            <MovieRow 
              title="Action Hits" 
              fetchAction={() => movieService.getMoviesByGenre(28)} 
            />

            {/* 5. Comedy Movies (Genre ID: 35) */}
            <MovieRow 
              title="Comedies" 
              fetchAction={() => movieService.getMoviesByGenre(35)} 
            />

            {/* 6. Horror Movies (Genre ID: 27) */}
            <MovieRow 
              title="Horror Nights" 
              fetchAction={() => movieService.getMoviesByGenre(27)} 
            />

            {/* 7. Sci-Fi Movies (Genre ID: 878) */}
            <MovieRow 
              title="Sci-Fi & Fantasy" 
              fetchAction={() => movieService.getMoviesByGenre(878)} 
            />
          </Container>
        </div>
      </PageWrapper>
    </MainLayout>
  );
}
