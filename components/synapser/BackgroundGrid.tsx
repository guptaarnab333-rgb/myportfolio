/**
 * A subtle fixed square grid behind the content (Synapser-style). Uniform
 * square cells within the page margins, fixed so it stays put on scroll.
 * Purely decorative.
 */
export default function BackgroundGrid({
  size = 150,
}: {
  /** square cell size in px */
  size?: number;
}) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto h-full max-w-[1440px] px-6 md:px-16">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(20,20,20,0.09) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(20,20,20,0.09) 1.5px, transparent 1.5px)",
            backgroundSize: `${size}px ${size}px`,
          }}
        />
      </div>
    </div>
  );
}
