"use client";

import { cdnVideo, resolveMediaSrc } from "@/lib/cdn";

type CdnVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
};

/**
 * HTML5 video with CDN-resolved src and optional poster (image key or URL).
 */
export function CdnVideo({
  src,
  poster,
  className = "",
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = true,
}: CdnVideoProps) {
  const videoSrc =
    src.startsWith("http://") || src.startsWith("https://")
      ? src
      : cdnVideo(src);

  if (!videoSrc) {
    return (
      <div
        className={`flex aspect-video items-center justify-center rounded-xl bg-gray-900 text-sm text-gray-400 ${className}`}
      >
        Video preview (configure Cloudflare CDN)
      </div>
    );
  }

  const posterUrl = poster ? resolveMediaSrc(poster, { width: 1280, height: 720 }) : undefined;

  return (
    <video
      src={videoSrc}
      poster={posterUrl}
      className={className}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload="metadata"
    />
  );
}
