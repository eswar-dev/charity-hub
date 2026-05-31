const STORAGE_KEY = "ch-guest-engagement";
const STREAK_KEY = "ch-engagement-streak";
const RETURN_KEY = "ch-post-auth-return";

export type GuestEngagement = {
  likedPostIds: string[];
  sharedPostIds: string[];
  acceptedChallengeIds: string[];
  lastVisitDate: string;
};

function readEngagement(): GuestEngagement {
  if (typeof window === "undefined") {
    return { likedPostIds: [], sharedPostIds: [], acceptedChallengeIds: [], lastVisitDate: "" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { likedPostIds: [], sharedPostIds: [], acceptedChallengeIds: [], lastVisitDate: "" };
    return { ...{ likedPostIds: [], sharedPostIds: [], acceptedChallengeIds: [], lastVisitDate: "" }, ...JSON.parse(raw) };
  } catch {
    return { likedPostIds: [], sharedPostIds: [], acceptedChallengeIds: [], lastVisitDate: "" };
  }
}

function writeEngagement(data: GuestEngagement) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function recordPostLike(postId: string) {
  const data = readEngagement();
  if (!data.likedPostIds.includes(postId)) {
    data.likedPostIds = [...data.likedPostIds, postId];
    writeEngagement(data);
  }
  bumpStreak();
}

export function recordPostShare(postId: string) {
  const data = readEngagement();
  if (!data.sharedPostIds.includes(postId)) {
    data.sharedPostIds = [...data.sharedPostIds, postId];
    writeEngagement(data);
  }
  bumpStreak();
}

export function recordChallengeAccept(challengeId: string) {
  const data = readEngagement();
  if (!data.acceptedChallengeIds.includes(challengeId)) {
    data.acceptedChallengeIds = [...data.acceptedChallengeIds, challengeId];
    writeEngagement(data);
  }
  bumpStreak();
}

export function hasAcceptedChallenge(challengeId: string): boolean {
  return readEngagement().acceptedChallengeIds.includes(challengeId);
}

export function getGuestEngagementSummary() {
  const data = readEngagement();
  const reactions = data.likedPostIds.length + data.sharedPostIds.length;
  return {
    ...data,
    reactionCount: reactions,
    totalActions: reactions + data.acceptedChallengeIds.length,
  };
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function bumpStreak() {
  if (typeof window === "undefined") return;
  const today = todayKey();
  const raw = localStorage.getItem(STREAK_KEY);
  let streak = 1;
  if (raw) {
    try {
      const { lastDate, count } = JSON.parse(raw) as { lastDate: string; count: number };
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().slice(0, 10);
      if (lastDate === today) streak = count;
      else if (lastDate === yesterdayKey) streak = count + 1;
      else streak = 1;
    } catch {
      streak = 1;
    }
  }
  localStorage.setItem(STREAK_KEY, JSON.stringify({ lastDate: today, count: streak }));
  const eng = readEngagement();
  eng.lastVisitDate = today;
  writeEngagement(eng);
}

export function getEngagementStreak(): number {
  if (typeof window === "undefined") return 0;
  bumpStreak();
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return 1;
    return (JSON.parse(raw) as { count: number }).count;
  } catch {
    return 1;
  }
}

export function setPostAuthReturn(path: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(RETURN_KEY, path);
}

export function consumePostAuthReturn(fallback = "/feed"): string {
  if (typeof window === "undefined") return fallback;
  const path = sessionStorage.getItem(RETURN_KEY) ?? fallback;
  sessionStorage.removeItem(RETURN_KEY);
  return path;
}

export function peekPostAuthReturn(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(RETURN_KEY);
}
