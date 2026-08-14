"use client";

import { useSyncExternalStore } from "react";
import {
  subscribeReducedMotion,
  getReducedMotion,
  getServerReducedMotion,
} from "@/lib/reducedMotion";

/**
 * A recording of the real console, not a mock-up of one. Div-based fake screenshots
 * are a tell; this is the actual route captured under script.
 *
 * The server renders the still frame and the browser upgrades to video only when
 * motion is welcome, so a reduced-motion visitor never downloads the video at all.
 */
export default function ConsolePreview({
  mp4,
  webm,
  poster,
  label,
  caption,
}: {
  mp4: string;
  webm: string;
  poster: string;
  label: string;
  caption: string;
}) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  return (
    <figure className="console">
      <div className="console-frame">
        {reduced ? (
          <img src={poster} alt={label} width={1728} height={1080} />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={poster}
            aria-label={label}
            width={1728}
            height={1080}
          >
            <source src={webm} type="video/webm" />
            <source src={mp4} type="video/mp4" />
          </video>
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
