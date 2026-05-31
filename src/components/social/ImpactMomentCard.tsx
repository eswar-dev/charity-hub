"use client";

import { CdnImage } from "@/components/shared/CdnImage";
import type { FeedPost } from "@/data/feed";
import { getCreatorById } from "@/data/creators";
import { Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ParticipationCounter } from "@/components/social/ParticipationCounter";
import { getEventById } from "@/data/events";
import { useToast } from "@/context/ToastContext";
import { recordPostLike } from "@/lib/guestEngagement";

const impactStats = [
  { value: "847", label: "books" },
  { value: "6", label: "libraries" },
  { value: "3", label: "programs" },
];

interface ImpactMomentCardProps {
  post: FeedPost;
  onJoinEvent?: () => void;
}

export function ImpactMomentCard({ post, onJoinEvent }: ImpactMomentCardProps) {
  const creator = getCreatorById(post.seId);
  const event = post.eventId ? getEventById(post.eventId) : undefined;
  const { showToast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--impact-gold)]/40 bg-white shadow-sm ring-1 ring-[var(--impact-gold)]/20">
      <div className="bg-gradient-to-r from-[var(--impact-gold)] to-amber-500 px-4 py-2 text-center text-xs font-bold tracking-wider text-white">
        ★ IMPACT REVEAL
      </div>
      {creator && (
        <div className="flex items-center gap-3 p-4 pb-0">
          <Link href={`/creators/${creator.id}`}>
            <CdnImage
              src={creator.avatar}
              alt=""
              width={40}
              height={40}
              className="rounded-full object-cover"
              cdnOptions={{ width: 80, height: 80, fit: "cover" }}
            />
          </Link>
          <div>
            <p className="font-semibold">{creator.name}</p>
            <p className="text-xs text-gray-500">{creator.handle}</p>
          </div>
        </div>
      )}
      <div className="relative mx-4 mt-3 aspect-[4/3] overflow-hidden rounded-xl">
        <CdnImage
          src={post.mediaUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 65vw"
          cdnOptions={{ width: 1200, height: 900, fit: "cover" }}
        />
      </div>
      <div className="border-b bg-amber-50/50 px-4 py-5">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--impact-gold)]">
          Here&apos;s what your participation created
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-6">
          {impactStats.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-3xl font-bold text-[var(--ch-teal)]"
                style={{ fontFamily: "var(--font-impact)" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3 p-4">
        <p className="text-sm leading-relaxed text-gray-800">{post.content}</p>
        {event && (
          <ParticipationCounter
            participantCount={event.participants}
            raisedAmount={event.raised}
            raisedGoal={event.goal}
            size="sm"
          />
        )}
        {event && (
          <button
            type="button"
            onClick={onJoinEvent}
            className="w-full rounded-full bg-[var(--ch-teal)] py-2.5 text-sm font-semibold text-white"
          >
            Join This Event →
          </button>
        )}
      </div>
      <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-gray-600">
        <button
          type="button"
          onClick={() => {
            const next = !liked;
            setLiked(next);
            setLikes(next ? likes + 1 : likes - 1);
            if (next) {
              recordPostLike(post.id);
              showToast("You celebrated this impact moment ✨", "success");
            }
          }}
          className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          {likes}
        </button>
        <button type="button" className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          {post.comments}
        </button>
        <button
          type="button"
          onClick={() => showToast("Link copied!", "success")}
          className="flex items-center gap-1"
        >
          <Share2 className="h-4 w-4" />
          {post.shares}
        </button>
        <button type="button" aria-label="More options">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
