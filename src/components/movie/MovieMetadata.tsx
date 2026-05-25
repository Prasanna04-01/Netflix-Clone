import { Star, Clock, Calendar, Globe, Info } from "lucide-react";
import { Genre } from "@/types/movie";

interface MovieMetadataProps {
  rating: number;
  releaseDate: string;
  runtime: number | null;
  genres: Genre[];
  status: string;
  originalLanguage: string;
}

/**
 * MovieMetadata displays organized technical and categorical information about a movie.
 */
export const MovieMetadata = ({
  rating,
  releaseDate,
  runtime,
  genres,
  status,
  originalLanguage,
}: MovieMetadataProps) => {
  const hours = runtime ? Math.floor(runtime / 60) : 0;
  const minutes = runtime ? runtime % 60 : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium">
        {/* Rating */}
        <div className="flex items-center gap-1.5 text-green-500 font-bold">
          <Star className="h-5 w-5 fill-current" />
          <span>{rating.toFixed(1)} Rating</span>
        </div>

        <span className="text-nexora-grey">|</span>

        {/* Release Year */}
        <div className="flex items-center gap-1.5 text-white/90">
          <Calendar className="h-5 w-5" />
          <span>{new Date(releaseDate).getFullYear()}</span>
        </div>

        <span className="text-nexora-grey">|</span>

        {/* Runtime */}
        <div className="flex items-center gap-1.5 text-white/90">
          <Clock className="h-5 w-5" />
          <span>{hours}h {minutes}m</span>
        </div>

        <span className="text-nexora-grey">|</span>

        {/* Certification Badge */}
        <span className="px-2 py-0.5 border border-white/40 rounded text-xs uppercase tracking-widest text-white/80">
          HD
        </span>
      </div>

      {/* Genres */}
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm font-medium text-white/90 border border-white/5"
          >
            {genre.name}
          </span>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-nexora-grey uppercase tracking-wider">Status</span>
          <span className="text-sm font-semibold text-white/90">{status}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-nexora-grey uppercase tracking-wider">Language</span>
          <span className="text-sm font-semibold text-white/90 uppercase">{originalLanguage}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-nexora-grey uppercase tracking-wider">Certification</span>
          <span className="text-sm font-semibold text-white/90">PG-13</span>
        </div>
      </div>
    </div>
  );
};
