import { Star } from "lucide-react";

interface HeroMetadataProps {
  releaseDate?: string;
  voteAverage: number;
  isAdult: boolean;
}

/**
 * HeroMetadata displays movie details like rating, year, and age certification.
 */
export const HeroMetadata = ({
  releaseDate,
  voteAverage,
  isAdult,
}: HeroMetadataProps) => {
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const rating = voteAverage.toFixed(1);

  return (
    <div className="flex items-center gap-4 text-sm md:text-base font-medium text-white/90 mb-4 md:mb-6">
      <div className="flex items-center gap-1 text-green-500 font-bold">
        <Star className="h-4 w-4 fill-current" />
        <span>{rating} Rating</span>
      </div>
      <span className="text-nexora-grey">|</span>
      <span>{releaseYear}</span>
      <span className="text-nexora-grey">|</span>
      <span className="px-2 py-0.5 border border-white/40 rounded text-[10px] md:text-xs uppercase tracking-widest">
        {isAdult ? "18+" : "PG-13"}
      </span>
      <span className="px-2 py-0.5 border border-white/40 rounded text-[10px] md:text-xs uppercase tracking-widest">
        HD
      </span>
    </div>
  );
};
