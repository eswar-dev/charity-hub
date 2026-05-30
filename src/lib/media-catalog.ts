/**
 * Stable asset keys for prototype media.
 * `path` / `videoPath` match files under `public/assets/` (served at `/assets/...`).
 */
export type MediaAsset = {
  imageId?: string;
  path?: string;
  videoPath?: string;
  fallbackSeed: string;
  fallbackVideoUrl?: string;
};

/** Files in `public/assets/` */
const LOCAL = {
  eventBanner: "assets/events/walls-io-zrJACD9NSxw-unsplash.jpg",
  eventVideoA: "assets/events/15476299_1920_1080_25fps.mp4",
  eventVideoB: "assets/events/15557512_3840_2160_60fps.mp4",
  eventVideoC: "assets/events/16048306_1920_1080_100fps.mp4",
  feedHero: "assets/feed/the-gold-star-events-ll95fiFbF3M-unsplash.jpg",
  creatorAvatarA: "assets/creators/declan-sun-tW3lpYYgP3w-unsplash.jpg",
  creatorAvatarB: "assets/creators/nubelson-fernandes-iE71-TMrrkE-unsplash.jpg",
  nonprofitLogoA: "assets/nonprofits/markus-spiske-vm4XjbbU-Sc-unsplash.jpg",
  nonprofitLogoB: "assets/nonprofits/shelby-murphy-figueroa-tYq6MoiTR-E-unsplash.jpg",
  donorAvatar: "assets/donors/microsoft-copilot-_p1ajsued9c-unsplash.jpg",
} as const;

function eventBannerEntry(
  imageId: string,
  path: string,
  videoPath: string,
  fallbackSeed: string
): MediaAsset {
  return { imageId, path, videoPath, fallbackSeed };
}

export const MEDIA_CATALOG: Record<string, MediaAsset> = {
  "events/evt-001/banner": eventBannerEntry(
    "evt-001-banner",
    LOCAL.eventBanner,
    LOCAL.eventVideoA,
    "knockout"
  ),
  "events/evt-001/video": {
    imageId: "evt-001-video",
    path: LOCAL.eventBanner,
    videoPath: LOCAL.eventVideoA,
    fallbackSeed: "knockout",
    fallbackVideoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  "events/evt-002/banner": eventBannerEntry(
    "evt-002-banner",
    LOCAL.feedHero,
    LOCAL.eventVideoB,
    "greenclean"
  ),
  "events/evt-002/video": {
    imageId: "evt-002-video",
    path: LOCAL.feedHero,
    videoPath: LOCAL.eventVideoB,
    fallbackSeed: "greenclean",
  },
  "events/evt-003/banner": eventBannerEntry(
    "evt-003-banner",
    LOCAL.nonprofitLogoA,
    LOCAL.eventVideoC,
    "backpack"
  ),
  "events/evt-003/video": {
    imageId: "evt-003-video",
    path: LOCAL.nonprofitLogoA,
    videoPath: LOCAL.eventVideoC,
    fallbackSeed: "backpack",
  },
  "events/evt-004/banner": eventBannerEntry(
    "evt-004-banner",
    LOCAL.nonprofitLogoB,
    LOCAL.eventVideoA,
    "rainforest"
  ),
  "events/evt-004/video": {
    imageId: "evt-004-video",
    path: LOCAL.nonprofitLogoB,
    videoPath: LOCAL.eventVideoA,
    fallbackSeed: "rainforest",
  },
  "events/evt-005/banner": eventBannerEntry(
    "evt-005-banner",
    LOCAL.creatorAvatarA,
    LOCAL.eventVideoB,
    "artgala"
  ),
  "events/evt-005/video": {
    imageId: "evt-005-video",
    path: LOCAL.creatorAvatarA,
    videoPath: LOCAL.eventVideoB,
    fallbackSeed: "artgala",
  },
  "events/evt-006/banner": eventBannerEntry(
    "evt-006-banner",
    LOCAL.creatorAvatarB,
    LOCAL.eventVideoC,
    "wellness"
  ),
  "events/evt-006/video": {
    imageId: "evt-006-video",
    path: LOCAL.creatorAvatarB,
    videoPath: LOCAL.eventVideoC,
    fallbackSeed: "wellness",
  },
  "impact/evt-001": {
    imageId: "impact-evt-001",
    path: LOCAL.eventBanner,
    videoPath: LOCAL.eventVideoA,
    fallbackSeed: "impact-knockout",
  },
  "impact/evt-002": {
    imageId: "impact-evt-002",
    path: LOCAL.feedHero,
    videoPath: LOCAL.eventVideoB,
    fallbackSeed: "impact-green",
  },
  "impact/evt-003": {
    imageId: "impact-evt-003",
    path: LOCAL.nonprofitLogoA,
    videoPath: LOCAL.eventVideoC,
    fallbackSeed: "impact-backpack",
  },
  "impact/evt-004": {
    imageId: "impact-evt-004",
    path: LOCAL.nonprofitLogoB,
    videoPath: LOCAL.eventVideoA,
    fallbackSeed: "impact-rainforest",
  },
  "impact/evt-005": {
    imageId: "impact-evt-005",
    path: LOCAL.creatorAvatarA,
    videoPath: LOCAL.eventVideoB,
    fallbackSeed: "impact-art",
  },
  "impact/evt-006": {
    imageId: "impact-evt-006",
    path: LOCAL.creatorAvatarB,
    videoPath: LOCAL.eventVideoC,
    fallbackSeed: "impact-wellness",
  },
  "nonprofits/np-001/logo": {
    imageId: "np-001-logo",
    path: LOCAL.nonprofitLogoA,
    fallbackSeed: "greenpath",
  },
  "nonprofits/np-002/logo": {
    imageId: "np-002-logo",
    path: LOCAL.nonprofitLogoB,
    fallbackSeed: "brightfutures",
  },
  "nonprofits/np-003/logo": {
    imageId: "np-003-logo",
    path: LOCAL.nonprofitLogoA,
    fallbackSeed: "cityshelter",
  },
  "creators/se-001/avatar": {
    imageId: "se-001-avatar",
    path: LOCAL.creatorAvatarA,
    fallbackSeed: "alex",
  },
  "creators/se-002/avatar": {
    imageId: "se-002-avatar",
    path: LOCAL.creatorAvatarB,
    fallbackSeed: "jordan",
  },
  "creators/se-003/avatar": {
    imageId: "se-003-avatar",
    path: LOCAL.creatorAvatarB,
    fallbackSeed: "morgan",
  },
  "creators/se-001/banner": {
    imageId: "se-001-banner",
    path: LOCAL.feedHero,
    fallbackSeed: "alexforgood",
  },
  "creators/se-002/banner": {
    imageId: "se-002-banner",
    path: LOCAL.eventBanner,
    fallbackSeed: "jordanchanges",
  },
  "creators/se-003/banner": {
    imageId: "se-003-banner",
    path: LOCAL.nonprofitLogoB,
    fallbackSeed: "morgangreen",
  },
  "feed/post-001": {
    imageId: "post-001",
    path: LOCAL.eventBanner,
    videoPath: LOCAL.eventVideoA,
    fallbackSeed: "knockout-ring",
    fallbackVideoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  "feed/post-002": {
    imageId: "post-002",
    path: LOCAL.nonprofitLogoA,
    fallbackSeed: "backpacks",
  },
  "feed/post-003": {
    imageId: "post-003",
    path: LOCAL.feedHero,
    fallbackSeed: "treeplant",
  },
  "feed/post-004": {
    imageId: "post-004",
    path: LOCAL.creatorAvatarA,
    fallbackSeed: "story-boxer",
  },
  "feed/post-005": {
    imageId: "post-005",
    path: LOCAL.nonprofitLogoB,
    fallbackSeed: "library",
  },
  "feed/post-006": {
    imageId: "post-006",
    path: LOCAL.eventBanner,
    fallbackSeed: "park-cleanup",
  },
  "donations/maria": {
    imageId: "don-maria",
    path: LOCAL.creatorAvatarA,
    fallbackSeed: "maria",
  },
  "donations/james": {
    imageId: "don-james",
    path: LOCAL.creatorAvatarB,
    fallbackSeed: "james",
  },
  "donations/anon1": {
    imageId: "don-anon1",
    path: LOCAL.donorAvatar,
    fallbackSeed: "anon1",
  },
  "donations/elena": {
    imageId: "don-elena",
    path: LOCAL.nonprofitLogoA,
    fallbackSeed: "elena",
  },
  "donations/david": {
    imageId: "don-david",
    path: LOCAL.nonprofitLogoB,
    fallbackSeed: "david",
  },
  "donations/rachel": {
    imageId: "don-rachel",
    path: LOCAL.feedHero,
    fallbackSeed: "rachel",
  },
  "donations/sam": {
    imageId: "don-sam",
    path: LOCAL.eventBanner,
    fallbackSeed: "sam",
  },
  "donations/tyler": {
    imageId: "don-tyler",
    path: LOCAL.creatorAvatarA,
    fallbackSeed: "tyler",
  },
  "donations/priya": {
    imageId: "don-priya",
    path: LOCAL.creatorAvatarB,
    fallbackSeed: "priya",
  },
  "placeholders/upload": {
    imageId: "upload-placeholder",
    path: LOCAL.feedHero,
    fallbackSeed: "upload",
  },
  "placeholders/preview": {
    imageId: "preview",
    path: LOCAL.eventBanner,
    fallbackSeed: "preview",
  },
};

/** Impact reveal hero + optional video for an event id */
export function getImpactMediaKey(eventId: string): string {
  return `impact/${eventId}`;
}
