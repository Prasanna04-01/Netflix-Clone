import Image from "next/image";
import { getBackdropUrl } from "@/utils/image";

interface BackdropHeaderProps {
  backdropPath: string | null;
  title: string;
}

/**
 * BackdropHeader creates an immersive cinematic header for the details page.
 */
export const BackdropHeader = ({ backdropPath, title }: BackdropHeaderProps) => {
  return (
    <div className="absolute inset-0 h-[70vh] w-full overflow-hidden">
      <Image
        src={getBackdropUrl(backdropPath, "ORIGINAL")}
        alt={title}
        fill
        priority
        className="object-cover object-top opacity-40 blur-[2px]"
        sizes="100vw"
      />
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-nexora-black via-nexora-black/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-nexora-black/40 via-transparent to-transparent z-10" />
    </div>
  );
};
