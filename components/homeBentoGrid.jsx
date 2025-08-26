"use client";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import gsap from "gsap";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconTableColumn,
  IconInfoCircle,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IconCloud } from "./iconCloud";
import Link from "next/link";
import Typewriter from "./ui/typewriter";

const slugs = [
  // Languages
  "java",
  "python",
  "c",
  "javascript",
  "kotlin",
  "elixir",

  // Frontend
  "react",
  "nextdotjs",
  "html5",
  "css3",
  "graphql",

  // Backend
  "nodedotjs",
  "express",
  "springboot",

  // QA / Automation
  "selenium",
  "appium",
  "junit5",
  "cucumber",
  "postman",
  "testrail",
  "browserstack",
  "saucelabs",
  "randoop",

  // DevOps / Tools
  "jenkins",
  "circleci",
  "git",
  "github",
  "docker",
  "kubernetes",
  "apachemaven",
  "gradle",
  "linux",
  "jira",
  "figma",

  // Data / ML / DB
  "numpy",
  "pandas",
  "scikitlearn",
  "huggingface",
  "spacy",
  "seaborn",
  "networkx",
  "apachespark",
  "mysql",
  "mongodb",
];

export function BentoGridThirdDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto auto-rows-[14rem] sm:auto-rows-[16rem] md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonOne = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (element) {
      gsap.to(element, { duration: 0.3, rotateX: 0, rotateY: 0, ease: "power1.inOut" });
    }
  };

  return (
    <div className="relative w-full h-56 sm:h-64 md:h-[20vh]">
      <div className="story-img-container">
        <div className="story-img-mask">
          <div className="story-img-content">
            <video
              ref={frameRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseLeave}
              onMouseEnter={handleMouseLeave}
              src="/videos/intro.mp4"
              className="object-cover object-center size-full"
              loop
              muted
              autoPlay
              playsInline
            />
          </div>
        </div>

        {/* rounded-corner glow filter */}
        <svg className="invisible absolute size-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="flt_tag">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="flt_tag"
              />
              <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const SkeletonTwo = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden pb-10 mx-auto">
      <IconCloud iconSlugs={slugs} />
    </div>
  </div>
);

const HEADSHOT_TOP_PAD = 104;
const HEADSHOT_SCALE = 0.98;
const HEADSHOT_OFFSETY = 0;

// Sizes/padding knobs
const TITLE_SIZE = "text-[15px] md:text-[18px]";
const BODY_SIZE = "text-[11px] md:text-[13px]";
const TEXT_PAD = "p-3 md:p-4";

const SkeletonThree = () => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-white dark:bg-neutral-900">
      {/* TEXT AREA (top) */}
      <div
        className={`absolute inset-x-0 top-0 z-10 ${TEXT_PAD}`}
        style={{ height: HEADSHOT_TOP_PAD }}
      >
        <h3 className={`${TITLE_SIZE} font-semibold leading-tight text-black dark:text-white`}>
          Hey, I'm Yash 👋
        </h3>

        {/* typing titles */}
        <div className="text-[12px] md:text-[14px] font-semibold text-black/80 dark:text-white/90 mt-1">
          <Typewriter
            words={[
              "Software Engineer",
              "Full Stack Developer",
              "QA Automation Engineer",
              "ML Enthusiast",
            ]}
            typingSpeed={60}
            deletingSpeed={35}
            holdTime={900}
          />
        </div>

        <p className={`${BODY_SIZE} mt-2 leading-relaxed md:leading-snug text-neutral-700 dark:text-neutral-300 max-w-sm`}>
          
          CS graduate passionate about building scalable apps and intelligent systems. I craft
          reliable, data-driven solutions with modern web and backend tools.
        </p>
      </div>

      {/* IMAGE AREA (locked to bottom) */}
      <div className="absolute inset-x-0 bottom-0" style={{ top: HEADSHOT_TOP_PAD }}>
        <div className="relative h-full w-full">
          <Image
            src="/images/yash-headshot.webp"
            alt="Yash headshot"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className="pointer-events-none select-none object-contain object-bottom"
            style={{
              transform: `scale(${HEADSHOT_SCALE}) translateY(${HEADSHOT_OFFSETY}px)`,
              transformOrigin: "bottom center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const SkeletonFour = () => {
  const first = { initial: { x: 20, rotate: -5 }, hover: { x: 0, rotate: 0 } };
  const first2 = { initial: { y: 10, rotate: -5 }, hover: { y: 0, rotate: 0 } };
  const second = { initial: { x: 20, rotate: -5 }, hover: { x: 0, rotate: 0 } };

  const Pill = ({ color, children }) => (
    <p
      className={`border ${color.border} ${color.bg} ${color.text} text-xs rounded-full px-2 py-0.5 mt-4`}
    >
      {children}
    </p>
  );

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] md:flex-row space-x-2 flex-col"
    >
      <motion.div
        variants={first}
        className="h-full md:w-1/3 w-[80vw] rounded-2xl bg-white p-4 dark:bg-neutral-800 dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <p className="text-center font-semibold text-lg text-neutral-700 dark:text-neutral-300">
          Ownership
        </p>
        <p className="sm:text-sm text-xs text-center text-neutral-500 mt-4">
          Follow through on performance, features, tests - until done right.
        </p>
        <Pill
          color={{
            border: "border-emerald-500",
            bg: "bg-emerald-100 dark:bg-emerald-900/20",
            text: "text-emerald-600",
          }}
        >
          End-to-end
        </Pill>
      </motion.div>

      <motion.div
        variants={first2}
        className="h-full relative z-20 md:w-1/3 w-[80vw] rounded-2xl bg-white p-4 dark:bg-neutral-900 dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <p className="text-center font-semibold text-lg text-neutral-700 dark:text-neutral-300">
          Reliability
        </p>
        <p className="sm:text-sm text-xs text-center text-neutral-500 mt-4">
          Write code that’s tested, maintainable, and CI/CD ready.
        </p>
        <Pill
          color={{
            border: "border-blue-500",
            bg: "bg-blue-100 dark:bg-blue-900/20",
            text: "text-blue-600",
          }}
        >
          Ship with confidence
        </Pill>
      </motion.div>

      <motion.div
        variants={second}
        className="h-full md:w-1/3 w-[80vw] rounded-2xl bg-white p-4 dark:bg-neutral-800 dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <p className="text-center font-semibold text-lg text-neutral-700 dark:text-neutral-300">
          Curiosity
        </p>
        <p className="sm:text-sm text-xs text-center text-neutral-500 mt-4">
          Always learning, prototyping, iterating and improving.
        </p>
        <Pill
          color={{
            border: "border-yellow-500",
            bg: "bg-yellow-100 dark:bg-yellow-900/20",
            text: "text-yellow-600",
          }}
        >
          Never stop learning
        </Pill>
      </motion.div>

      <motion.div
        variants={first2}
        className="h-full relative z-20 md:w-1/3 w-[80vw] rounded-2xl bg-white p-4 dark:bg-neutral-900 dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <p className="text-center font-semibold text-lg text-neutral-700 dark:text-neutral-300">
          Collaboration
        </p>
        <p className="sm:text-sm text-xs text-center text-neutral-500 mt-4">
          Clear communication, team-first mindset, clean PRs.
        </p>
        <Pill
          color={{
            border: "border-pink-500",
            bg: "bg-pink-100 dark:bg-pink-900/20",
            text: "text-pink-600",
          }}
        >
          Stronger together
        </Pill>
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: null,
    header: <SkeletonThree />,
    className: "md:col-span-1 p-0 [&>*:nth-child(2)]:hidden overflow-hidden",
    icon: null,
  },
  {
    title: (
      <Link href="/projects" className="flex gap-2 flex-wrap items-center">
        <span className="whitespace-nowrap">See recent projects</span>
        <IconArrowUpRight className="border border-white rounded-full size-6" />
      </Link>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Toolbox",
    header: <SkeletonTwo />,
    className: "md:col-span-1",
  },
  {
    title: "Core Values",
    header: <SkeletonFour />,
    className: "md:col-span-3",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
