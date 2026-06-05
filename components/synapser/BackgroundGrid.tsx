/**
 * A subtle fixed box grid behind the content (Synapser-style): vertical column
 * hairlines + horizontal hairlines forming cells, within the page margins,
 * fixed so it stays put on scroll. Purely decorative.
 */
export default function BackgroundGrid({
  cols = 6,
  row = 190,
}: {
  cols?: number;
  row?: number;
}) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto h-full max-w-[1440px] px-6 md:px-16">
        <div
          className="flex h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(20,20,20,0.05) 1px, transparent 1px)",
            backgroundSize: `100% ${row}px`,
          }}
        >
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={i}
              className="h-full flex-1 border-r border-black/[0.05] first:border-l"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
