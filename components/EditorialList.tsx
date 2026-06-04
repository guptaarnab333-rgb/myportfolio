"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Group = { label: string; items: string[] };

const groups: Group[] = [
  {
    label: "Software",
    items: [
      "Fusion 360",
      "Blender",
      "Figma",
      "Framer",
      "Photoshop",
      "Illustrator",
      "Lumion",
      "Looker",
    ],
  },
  {
    label: "Practices",
    items: [
      "Physical Prototyping",
      "Model Making",
      "Design Research",
      "User Research",
      "Fabrication",
      "Material Testing",
      "Sustainability",
      "UI / UX",
    ],
  },
];

function List({ group, reduced }: { group: Group; reduced: boolean }) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      const rows = ref.current?.querySelectorAll("li");
      if (!rows) return;
      gsap.from(rows, {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: EASE,
        stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { dependencies: [reduced] }
  );

  return (
    <div>
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-faint">
        {group.label}
      </p>
      <ul ref={ref} className="mt-4">
        {group.items.map((item) => (
          <li
            key={item}
            className="group flex items-baseline justify-between border-t border-line py-3 last:border-b"
          >
            <span className="font-oswald text-[clamp(24px,3.4vw,40px)] font-light leading-none tracking-[-0.02em] text-off transition-all duration-300 group-hover:translate-x-2 group-hover:text-white">
              {item}
            </span>
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              ↗
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EditorialList() {
  const reduced = useReducedMotion();

  return (
    <section
      id="toolkit"
      className="mx-auto max-w-[1120px] px-6 py-[120px] md:px-[64px]"
    >
      <h2 className="max-w-[900px] font-oswald text-[clamp(32px,5.2vw,72px)] font-light leading-[0.96] tracking-[-0.03em] text-white">
        The tools I reach for, and the things I keep getting better at.
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        {groups.map((g) => (
          <List key={g.label} group={g} reduced={reduced} />
        ))}
      </div>
    </section>
  );
}
