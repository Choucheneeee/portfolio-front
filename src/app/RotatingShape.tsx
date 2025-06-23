import { useRef, useEffect } from "react";

export default function RotatingShape({
  src,
  size = 400,
  className = "",
  speed = 0.2,
  
}: {
  src: string;
  size?: number;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rotation = window.scrollY * speed;
        // Ensure the rotation stays within 0-360 degrees
        ref.current.style.transformOrigin = "center";
        // move postition to the bottom left corner
        ref.current.style.position = "absolute";
        
        ref.current.style.transform = `rotate(${rotation}deg)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`absolute left-0 bottom-0 z-0 pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt="Rotating Shape"
        className="w-full h-full opacity-10"
        draggable={false}
        style={{ zIndex:4550 } /* Center the image */}
      />
    </div>
  );
}