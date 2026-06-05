/**
 * A subtle fixed square grid behind the content (Synapser-style). Full-bleed,
 * centred so the cells are symmetric around the viewport centre, fixed so it
 * stays put on scroll. Purely decorative.
 */
export default function BackgroundGrid({
  size = 150,
}: {
  /** square cell size in px */
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(20,20,20,0.09) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(20,20,20,0.09) 1.5px, transparent 1.5px)",
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: "center center",
      }}
    />
  );
}
