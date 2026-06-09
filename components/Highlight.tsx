import React from "react";

/**
 * Renders body copy with selected phrases highlighted in the brand accent,
 * matching the per-segment colouring used across the Figma case studies.
 *
 * Pass an array of segments: a plain string renders in the inherited body
 * colour; a [text, true] tuple renders the text in the accent colour.
 */
export type Seg = string | [string, boolean];

export function Highlight({ segments }: { segments: Seg[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (typeof seg === "string") return <React.Fragment key={i}>{seg}</React.Fragment>;
        const [text, hi] = seg;
        return hi ? (
          <span key={i} className="text-accent">
            {text}
          </span>
        ) : (
          <React.Fragment key={i}>{text}</React.Fragment>
        );
      })}
    </>
  );
}
