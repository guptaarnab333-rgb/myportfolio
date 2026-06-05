/**
 * A subtle fixed column grid behind the content (Synapser-style). Hairlines sit
 * at the layout columns within the page margins, fixed so they stay put on
 * scroll. Purely decorative.
 */
export default function BackgroundGrid({ cols = 6 }: { cols?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto flex h-full max-w-[1440px] px-6 md:px-16">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="h-full flex-1 border-r border-black/[0.055] first:border-l"
          />
        ))}
      </div>
    </div>
  );
}
