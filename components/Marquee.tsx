import { integrations } from "@/content/integrations";

/**
 * Integration marquee — CSS-only, no client JS (CLAUDE.md §10).
 * The track is duplicated so the keyframe can translate by exactly half its width
 * and loop seamlessly. The duplicate is aria-hidden so screen readers read the
 * list once. Animation is killed under prefers-reduced-motion, leaving a static row.
 */
export default function Marquee() {
  const row = (dupe: boolean) =>
    integrations.map((i) => (
      <span
        key={`${dupe ? "b" : "a"}-${i.name}`}
        className={`marq-item${i.primary ? " primary" : ""}`}
      >
        {i.name}
      </span>
    ));

  return (
    <div className="marq">
      <div className="marq-track">
        {row(false)}
        <span aria-hidden="true" style={{ display: "contents" }}>
          {row(true)}
        </span>
      </div>
    </div>
  );
}
