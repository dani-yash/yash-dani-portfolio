import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconHome,
  IconMap2,
  IconPresentation,
  IconBrandLinkedin,
  IconMail,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export function FooterDock() {
  const pathname = usePathname();

  const rawLinks = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
    },
    {
      title: "Journey",
      icon: <IconMap2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/journey",
    },
    {
      title: "Projects",
      icon: <IconPresentation className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/projects",
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/contact",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.linkedin.com/in/yashdani-",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://github.com/dani-yash",
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://instagram.com/tablastories",
    },
  ];

  const items = rawLinks.map((link) => {
    const isExternal = link.href.startsWith("http");
    return {
      ...link,
      active: !isExternal && link.href === pathname,
      target: isExternal ? "_blank" : undefined,
      rel: isExternal ? "noopener noreferrer" : undefined,
    };
  });

  return (
    <div className="fixed md:bottom-10 max-md:top-10 z-[50] left-1/2 -translate-x-1/2">
      <div className="flex items-end justify-center h-auto w-full">
        <FloatingDock items={items} />
      </div>
    </div>
  );
}
