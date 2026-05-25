import Image from "next/image";
import { getBackdropUrl } from "@/utils/image";

interface HeroBackgroundProps {
  backdropPath: string | null;
  title: string;
}

/**
 * HeroBackground handles the large cinematic backdrop image.
 * Uses Next.js Image for optimization and overlays for atmospheric depth.
 */
export const HeroBackground = ({ backdropPath, title }: HeroBackgroundProps) => {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={getBackdropUrl(backdropPath, "ORIGINAL")}
        alt={title}
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
        quality={90}
      />
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-nexora-black via-nexora-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-nexora-black via-transparent to-black/20 z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 nexora-gradient-bottom z-20" />
    </div>
  );
};
