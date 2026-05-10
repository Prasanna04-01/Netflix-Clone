import { Play, Info } from "lucide-react";
import { Button } from "@/components/common";

/**
 * HeroActions provides the primary CTA buttons for the hero section.
 */
export const HeroActions = () => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Button
        size="lg"
        leftIcon={<Play className="fill-current h-5 w-5 md:h-6 md:w-6" />}
        className="rounded-sm bg-white text-black hover:bg-white/90 font-bold border-none"
      >
        Play
      </Button>
      <Button
        variant="secondary"
        size="lg"
        leftIcon={<Info className="h-5 w-5 md:h-6 md:w-6" />}
        className="rounded-sm bg-netflix-grey/30 hover:bg-netflix-grey/40 backdrop-blur-md border-none text-white font-bold"
      >
        More Info
      </Button>
    </div>
  );
};
