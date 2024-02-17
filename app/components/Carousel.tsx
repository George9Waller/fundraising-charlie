"use client";

import React, { useEffect, useRef, useState } from "react";

const Carousel = ({ items }: { items: React.ReactNode[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(300);

  const handleResize = () => setSize(container.current?.offsetWidth || 300);

  useEffect(() => handleResize(), []);

  window && window.addEventListener("resize", handleResize);

  const advance = () => {
    if (currentIndex === items.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previous = () => {
    if (currentIndex === 0) {
      setCurrentIndex(items.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <div
        ref={container}
        className="flex items-center justify-center aspect-square w-full h-full transition-opacity"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="absolute aspect-square"
            style={{
              width: size,
              height: size,
              opacity: index === currentIndex ? 100 : 0,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="btn btn-circle" onClick={previous}>
          &lt;
        </button>
        <button className="btn btn-circle" onClick={advance}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default Carousel;
