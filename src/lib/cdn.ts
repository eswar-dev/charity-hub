import { MEDIA_CATALOG, type MediaAsset } from "@/lib/media-catalog";

export type CdnMediaMode = "off" | "images" | "cdn";

export type CdnImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
  variant?: string;
  fit?: "cover" | "contain" | "scale-down";
};

function getCatalogEntry(assetKey: string): MediaAsset | undefined {
  return MEDIA_CATALOG[assetKey];
}

export function getCdnMode(): CdnMediaMode {
  const mode = process.env.NEXT_PUBLIC_CF_MEDIA_MODE;
  if (mode === "images" || mode === "cdn") return mode;
  return "off";
}

function picsumFallback(seed: string, width = 800, height = 600): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

function buildPicsumFallback(
  assetKey: string,
  catalog: MediaAsset | undefined,
  options?: CdnImageOptions
): string {
  const seed = catalog?.fallbackSeed ?? assetKey.replace(/\//g, "-");
  return picsumFallback(seed, options?.width ?? 800, options?.height ?? 600);
}

function buildCloudflareImagesUrl(
  imageId: string,
  options?: CdnImageOptions
): string | null {
  const accountHash = process.env.NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH;
  if (!accountHash) return null;

  const variant =
    options?.variant ??
    process.env.NEXT_PUBLIC_CF_IMAGES_DEFAULT_VARIANT ??
    "public";

  if (options?.width) {
    const wVariant = process.env.NEXT_PUBLIC_CF_IMAGES_WIDTH_VARIANT_PREFIX;
    if (wVariant) {
      return `https://imagedelivery.net/${accountHash}/${imageId}/${wVariant}${options.width}`;
    }
  }

  return `https://imagedelivery.net/${accountHash}/${imageId}/${variant}`;
}

function localAssetUrl(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function isLocalCdnBase(base: string): boolean {
  try {
    const { hostname } = new URL(base);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function buildCdnUrl(path: string, options?: CdnImageOptions): string | null {
  const base = process.env.NEXT_PUBLIC_CF_CDN_BASE_URL?.replace(/\/$/, "");
  if (!base) return null;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Next.js serves `public/assets/` at `/assets/` — no Cloudflare resizing locally
  if (isLocalCdnBase(base)) {
    return normalizedPath;
  }

  const pathForCdn = normalizedPath.slice(1);

  if (process.env.NEXT_PUBLIC_CF_IMAGE_RESIZING === "true") {
    const params = [
      options?.width && `width=${options.width}`,
      options?.height && `height=${options.height}`,
      `quality=${options?.quality ?? 85}`,
      "format=auto",
      options?.fit && `fit=${options.fit}`,
    ]
      .filter(Boolean)
      .join(",");

    if (params) {
      return `${base}/cdn-cgi/image/${params}/${pathForCdn}`;
    }
  }

  return `${base}/${pathForCdn}`;
}

/**
 * Resolve an asset key (e.g. `events/evt-001/banner`) to a delivery URL.
 * Falls back to picsum when CDN env vars are not set.
 */
export function cdnImage(assetKey: string, options?: CdnImageOptions): string {
  const catalog = getCatalogEntry(assetKey);
  const mode = getCdnMode();

  if (mode === "images") {
    const imageId = catalog?.imageId ?? assetKey.replace(/\//g, "-");
    const url = buildCloudflareImagesUrl(imageId, options);
    if (url) return url;
  }

  if (mode === "cdn") {
    const path = catalog?.path ?? `assets/${assetKey}.jpg`;
    const url = buildCdnUrl(path, options);
    if (url) return url;
  }

  if (catalog?.path?.startsWith("assets/")) {
    return localAssetUrl(catalog.path);
  }

  return buildPicsumFallback(assetKey, catalog, options);
}

/**
 * Resolve video asset key to CDN or demo fallback URL.
 */
export function cdnVideo(assetKey: string): string | undefined {
  const catalog = getCatalogEntry(assetKey);
  const mode = getCdnMode();
  const videoPath = catalog?.videoPath;

  if (mode === "cdn" && videoPath) {
    const url = buildCdnUrl(videoPath);
    if (url) return url;
  }

  if (mode === "images") {
    const streamBase = process.env.NEXT_PUBLIC_CF_STREAM_BASE_URL?.replace(
      /\/$/,
      ""
    );
    if (streamBase && videoPath) return `${streamBase}/${videoPath}`;
  }

  if (videoPath?.startsWith("assets/")) {
    return localAssetUrl(videoPath);
  }

  return catalog?.fallbackVideoUrl;
}

/**
 * Accepts either a full URL (passthrough) or an asset key (resolved via CDN).
 */
export function resolveMediaSrc(
  src: string,
  options?: CdnImageOptions
): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return cdnImage(src, options);
}

/** Hostnames allowed for next/image — used in next.config */
export function getCdnRemotePatterns(): { protocol: string; hostname: string; pathname: string }[] {
  const patterns = [
    { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    { protocol: "https", hostname: "imagedelivery.net", pathname: "/**" },
    { protocol: "https", hostname: "storage.googleapis.com", pathname: "/**" },
  ];

  const base = process.env.NEXT_PUBLIC_CF_CDN_BASE_URL;
  if (base) {
    try {
      const { protocol, hostname } = new URL(base);
      patterns.push({
        protocol: protocol.replace(":", ""),
        hostname,
        pathname: "/**",
      });
    } catch {
      /* ignore invalid URL */
    }
  }

  const stream = process.env.NEXT_PUBLIC_CF_STREAM_BASE_URL;
  if (stream) {
    try {
      const host = new URL(stream).hostname;
      patterns.push({ protocol: "https", hostname: host, pathname: "/**" });
    } catch {
      /* ignore */
    }
  }

  return patterns;
}
