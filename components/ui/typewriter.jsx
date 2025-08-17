"use client";
import React, { useEffect, useState } from "react";

export default function Typewriter({
  words = [],
  typingSpeed = 70, // ms per char
  deletingSpeed = 40, // ms per char
  holdTime = 1000, // pause when a word is complete
  loop = true,
  className = "",
}) {
  const [i, setI] = useState(0); // index in words
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length] || "";
    if (!deleting) {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setDeleting(true), holdTime);
        return () => clearTimeout(t);
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setI((prev) => (prev + 1) % words.length);
        if (!loop && i + 1 >= words.length) return;
      }
    }
  }, [text, deleting, i, words, typingSpeed, deletingSpeed, holdTime, loop]);

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="whitespace-pre">{text}</span>
      <span className="w-[2px] h-[1.25em] bg-current animate-pulse" />
    </span>
  );
}
