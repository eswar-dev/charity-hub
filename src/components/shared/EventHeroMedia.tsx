import { CdnImage } from "@/components/shared/CdnImage";
import { CdnVideo } from "@/components/shared/CdnVideo";
import type { Event } from "@/types";

type EventHeroMediaProps = {
  event: Event;
  className?: string;
  imageClassName?: string;
  videoClassName?: string;
  priority?: boolean;
};

/**
 * Event hero: plays highlight video when configured, otherwise banner image.
 */
export function EventHeroMedia({
  event,
  className = "relative aspect-[21/9] w-full overflow-hidden bg-gray-900",
  imageClassName = "h-56 w-full object-cover md:h-72",
  videoClassName = "h-full w-full object-cover",
  priority = false,
}: EventHeroMediaProps) {
  if (event.video) {
    return (
      <div className={className}>
        <CdnVideo
          src={event.video}
          poster={event.banner}
          className={videoClassName}
          controls
          muted
          playsInline
        />
      </div>
    );
  }

  return (
    <CdnImage
      src={event.banner}
      alt=""
      width={900}
      height={400}
      className={imageClassName}
      priority={priority}
      cdnOptions={{ width: 1200, height: 514, fit: "cover" }}
    />
  );
}
