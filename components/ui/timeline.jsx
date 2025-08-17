"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const rowVariants = {
  hover: {}, // parent state to drive children; no visual change needed here
};

export const Timeline = ({ experience, education }) => {
  const [activeTab, setActiveTab] = useState("experience");
  const data = activeTab === "experience" ? experience : education;
  const isEducation = activeTab === "education";

  // --- spine progress (blue fill grows with scroll)
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    if (!listRef.current) return;
    setListHeight(listRef.current.getBoundingClientRect().height);
  }, [data]);

  // Start a little after top (no blue at load), finish exactly at last row
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 100%"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], [0, listHeight]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      {/* ---- Hero (original sizes/colors, centered, moved slightly up) ---- */}
      <div className="max-w-7xl mx-auto pt-12 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl font-bold mb-3 text-black dark:text-white text-center">
          Shaping my path
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-3xl mx-auto text-center">
          I&apos;m a CS grad who loves turning ideas into reliable software. Since 2020 I&apos;ve
          balanced hands-on engineering with roles that sharpened communication and
          ownership—automating QA at theScore, shipping projects at York, and leading consultative
          sales at Bell. Along the way I built impactful software across web, backend, and machine
          learning domains, and learned to ship with care. I&apos;m grateful for each step, as every
          challenge has sharpened my skills and helped me grow. This timeline highlights the moments
          that shaped how I work.
        </p>

        {/* ---- Centered switch-style toggle (Experience / Education) ---- */}
        <div className="mt-6 flex justify-center">
          <div className="relative w-[320px] h-10 rounded-full p-[1px] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#3b82f6_100%)]">
            <div className="h-full w-full rounded-full bg-neutral-950/90 backdrop-blur overflow-hidden">
              {/* The trick: an inset flex track that flips between start/end. The knob is 50% width; justify-* moves it cleanly. */}
              <div
                className={cn(
                  "absolute inset-1 flex transition-[justify-content] duration-300",
                  activeTab === "experience" ? "justify-start" : "justify-end"
                )}
              >
                <motion.div
                  layout
                  className="w-1/2 rounded-full bg-neutral-800/70 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              </div>

              <div className="relative grid grid-cols-2 h-full text-sm">
                <button
                  onClick={() => setActiveTab("experience")}
                  className={cn(
                    "z-10 rounded-full mx-1 my-1 text-neutral-300 hover:text-white transition",
                    activeTab === "experience" && "text-white"
                  )}
                >
                  Experience
                </button>
                <button
                  onClick={() => setActiveTab("education")}
                  className={cn(
                    "z-10 rounded-full mx-1 my-1 text-neutral-300 hover:text-white transition",
                    activeTab === "education" && "text-white"
                  )}
                >
                  Education
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Timeline list ---- */}
      <div className="relative max-w-7xl mx-auto pb-28 mt-10" ref={listRef}>
        {/* static spine */}
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-neutral-800/70" />
        {/* blue progress on spine — FIXED to reach the last item */}
        <motion.div
          style={{ height: progressHeight }}
          className="absolute left-8 top-0 w-[2px] bg-gradient-to-b from-sky-400 via-blue-400 to-blue-300 rounded-full"
        />

        {data.map((item, idx) => {
          // Use end date as the big gutter date for Education; start for Experience
          const bigDate = isEducation ? item.end || item.start : item.start;

          return (
            <motion.div
              key={`${item.company}-${item.role}-${idx}`}
              className="relative flex items-center gap-8 md:gap-10 pl-16 pr-4 md:pl-20 md:pr-6 py-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover="hover"
              variants={rowVariants}
            >
              {/* big dot — vertically centered to align with date & card */}
              <div className="absolute left-8 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="size-5 md:size-6 rounded-full bg-neutral-900 border border-neutral-700 grid place-items-center">
                  <motion.div
                    className="size-2.5 md:size-3 rounded-full bg-neutral-500"
                    variants={{
                      hover: {
                        scale: 1.25,
                        boxShadow: "0 0 0 6px rgba(59,130,246,0.12)",
                        transition: { type: "spring", stiffness: 260, damping: 18 },
                      },
                    }}
                  />
                </div>
              </div>

              {/* big gutter date */}
              <div className="w-32 md:w-44 flex-shrink-0 text-right pr-8">
                <span className="text-neutral-400 text-2xl md:text-5xl font-bold leading-none">
                  {bigDate}
                </span>
              </div>

              {/* card */}
              <div className="group/card relative flex-1 rounded-xl border border-white/5 bg-neutral-900/70 p-5 md:p-6 shadow-[0_6px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.35)] transition-shadow">
                {/* duration badge (top-right) */}
                <span className="absolute right-4 top-4 text-[11px] md:text-xs text-neutral-400">
                  {item.end ? `${item.start} — ${item.end}` : item.start}
                </span>

                {/* header */}
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={item.logo}
                    alt={item.company}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain rounded bg-neutral-800/60 p-1"
                  />
                  <div>
                    <h3 className="text-white text-base md:text-lg font-semibold leading-tight">
                      {item.role}
                    </h3>
                    <p className="text-neutral-400 text-xs md:text-sm">
                      {item.company}
                      {item.location ? <span className="mx-1">·</span> : null}
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* bullets expand on hover */}
                <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover/card:max-h-40 group-hover/card:opacity-100">
                  <ul className="space-y-2 pt-1">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="text-neutral-300 text-sm leading-relaxed">
                        • {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
