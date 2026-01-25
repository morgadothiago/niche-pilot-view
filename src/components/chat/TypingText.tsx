import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface TypingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function TypingText({ text, speed = 15, onComplete }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted prose-pre:text-muted-foreground prose-code:text-primary prose-strong:text-current">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
    </div>
  );
}
