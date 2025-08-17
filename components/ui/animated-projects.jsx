"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CalendarCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AnimatedProjects = ({ projects, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  function getRandomColor() {
    const colorArray = [
      "decoration-sky-500",
      "decoration-emerald-500",
      "decoration-pink-500",
      "decoration-amber-500",
      "decoration-rose-500",
    ];
    const shuffledArray = [...colorArray].sort(() => Math.random() - 0.5);
    return shuffledArray[0];
  }

  function getRandomColorObject() {
    const colorArray = [
      "border-blue-500 text-blue-600",
      "border-yellow-500 text-yellow-600",
      "border-emerald-500 text-emerald-600",
      "border-sky-500 text-sky-600",
      "border-red-500 text-red-600",
      "border-pink-500 text-pink-600",
      "border-indigo-500 text-indigo-600",
    ];
    const shuffledArray = [...colorArray].sort(() => Math.random() - 0.5);
    return shuffledArray[0];
  }

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const bounceUp = isMobile ? -40 : -80;

  return (
    <div className="max-w-[420px] sm:max-w-xl md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
        <div>
          <div className="relative h-64 sm:h-72 md:h-80 w-full">
            <AnimatePresence>
              {projects.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : projects.length + 2 - index,
                    y: isActive(index) ? [0, bounceUp, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {isActive(index) && (
                    <button className="absolute top-1 left-1 inline-flex text-sm py-2 animate-shimmer items-center justify-center rounded-tl-2xl rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                      <CalendarCheck className="mr-1 size-4" /> {projects[active].createdDate}
                    </button>
                  )}
                  {isActive(index) && (
                    <div className="absolute bottom-1 right-1">
                      <button className="relative inline-flex h-6 overflow-hidden rounded-br-2xl rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-br-2xl rounded-md bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                          {index + 1}
                        </span>
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <Link
              className={`text-2xl font-bold dark:text-white text-black underline underline-offset-4 flex gap-2 items-center cursor-pointer ${getRandomColor()}`}
              href={projects[active].link}
              target="_blank"
            >
              <span className="truncate text-ellipsis">{projects[active].name} </span>
              <ExternalLink className="text-2xl font-bold size-7" />
            </Link>
            <motion.p className="text-lg text-gray-500 mt-4 dark:text-neutral-300">
              {projects[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
            <motion.p className="text-lg mt-3 mb-4 text-gray-500 dark:text-neutral-300 flex gap-2 flex-wrap max-w-md">
              {projects[active].stack &&
                projects[active].stack.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.05 * index,
                    }}
                    className={`border whitespace-nowrap bg-blue-900/20 rounded-full text-sm px-2 py-0.5 mt-1 ${getRandomColorObject()}`}
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-6 md:pt-0 justify-between items-start">
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              >
                <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              >
                <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
              </button>
            </div>
            {/* <div>
              <button className="inline-flex text-sm py-2 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                Shimmer
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
