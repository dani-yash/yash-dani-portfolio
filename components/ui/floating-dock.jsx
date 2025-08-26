/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => (
  <>
    {/* Desktop (unchanged look/behavior) */}
    <div className={cn("hidden md:flex", desktopClassName)}>
      <FloatingDockDesktop items={items} className="" />
    </div>

    {/* Mobile (new, touch-friendly) */}
    <div className={cn("flex md:hidden", mobileClassName)}>
      <FloatingDockMobile items={items} className="" />
    </div>
  </>
);

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 gap-4 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  return (
    <nav
      className={cn(
        "flex rounded-full bg-gray-50/90 dark:bg-neutral-900/90 backdrop-blur px-3 py-2 shadow-lg",
        className
      )}
    >
      <ul className="flex items-center gap-3">
        {items.map(({ title, icon, href, active, target, rel }) => (
          <li key={title}>
            <Link
              href={href}
              target={target}
              rel={rel}
              aria-label={title}
              className={cn(
                "size-11 flex items-center justify-center rounded-full",
                "bg-gray-200/70 dark:bg-neutral-800/70 active:scale-95 transition",
                active && "ring-2 ring-gray-400/60"
              )}
            >
              <span className={cn(
                "flex items-center justify-center",
                active ? "text-black dark:text-white" : "text-neutral-600 dark:text-neutral-300"
              )}>
                {icon}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

function IconContainer({ mouseX, title, icon, href, active, target, rel }) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} target={target} rel={rel}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative ${active && "border border-gray-400"}`}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={`flex items-center justify-center`}
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
