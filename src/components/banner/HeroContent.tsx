"use client";

import { motion } from "framer-motion";
import { Movie } from "@/types/movie";
import { Container } from "@/components/common";
import { HeroMetadata } from "./HeroMetadata";
import { HeroActions } from "./HeroActions";
import { fadeIn, slideInLeft } from "@/constants/animations";

interface HeroContentProps {
  movie: Movie;
}

/**
 * HeroContent handles the textual and interactive part of the Hero Banner.
 * Uses Framer Motion for cinematic entrance animations.
 */
export const HeroContent = ({ movie }: HeroContentProps) => {
  return (
    <Container className="relative z-20 pt-[25vh] md:pt-[30vh] pb-12">
      <motion.div
        variants={slideInLeft}
        initial="initial"
        animate="animate"
        className="max-w-3xl"
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 drop-shadow-lg tracking-tight"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.45)" }}
        >
          {movie.title || movie.name}
        </motion.h1>

        <HeroMetadata 
          releaseDate={movie.release_date || movie.first_air_date}
          voteAverage={movie.vote_average}
          isAdult={movie.adult}
        />

        <motion.p 
          variants={fadeIn}
          className="text-base md:text-lg lg:text-xl text-white/90 mb-8 line-clamp-3 md:line-clamp-4 max-w-2xl drop-shadow-md font-medium leading-relaxed"
        >
          {movie.overview}
        </motion.p>

        <HeroActions />
      </motion.div>
    </Container>
  );
};
