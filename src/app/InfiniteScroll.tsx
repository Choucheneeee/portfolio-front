import React, { useRef, useEffect } from "react";

interface InfiniteScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  items: InfiniteScrollItem[];
  height?: number | string;
  speed?: number; // px per frame
  pauseOnHover?: boolean;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  items,
  height = 500,
  speed = 0.5,
  pauseOnHover = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const paused = useRef(false);
  const scrollTopRef = useRef(0);

  // Duplicate items for seamless scroll
  const renderItems = [...items, ...items];

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;
    if (!container || !scroll) return;

    let scrollTop = scrollTopRef.current;

    const getScrollHeight = () => {
      // Only half, since we duplicated the list
      return scroll.scrollHeight / 2;
    };

    const animate = () => {
      if (!paused.current) {
        scrollTop += speed;
        if (scrollTop >= getScrollHeight()) {
          scrollTop = 0;
        }
        if (scrollTop < 0) {
          scrollTop = getScrollHeight() - 1;
        }
        scroll.style.transform = `translateY(-${scrollTop}px)`;
        scrollTopRef.current = scrollTop;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Wheel event for manual scroll
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      paused.current = true;
      scrollTop += e.deltaY;
      if (scrollTop >= getScrollHeight()) {
        scrollTop = 0;
      }
      if (scrollTop < 0) {
        scrollTop = getScrollHeight() - 1;
      }
      scroll.style.transform = `translateY(-${scrollTop}px)`;
      scrollTopRef.current = scrollTop;
      // Resume animation after a short delay
      clearTimeout((scroll as any)._resumeTimeout);
      (scroll as any)._resumeTimeout = setTimeout(() => {
        paused.current = false;
      }, 600);
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    if (pauseOnHover) {
      container.addEventListener("mouseenter", () => {
        paused.current = true;
      });
      container.addEventListener("mouseleave", () => {
        paused.current = false;
      });
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      container.removeEventListener("wheel", onWheel);
      if (pauseOnHover) {
        container.removeEventListener("mouseenter", () => {
          paused.current = true;
        });
        container.removeEventListener("mouseleave", () => {
          paused.current = false;
        });
      }
    };
    // eslint-disable-next-line
  }, [items, speed, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      style={{
        height,
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
      className={className}
    >
      <div ref={scrollRef}>
        {renderItems.map((item, idx) => (
          <div key={idx} className="w-full flex justify-center">
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;