"use client";
// Slideshow component - chuyển từ slide.php (Owl Carousel → tự làm bằng React)
// Yêu cầu: hiển thị ảnh nguyên kích thước, không crop, không phóng to

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SlideItem {
  id: number;
  ten: string;
  photo: string;  // đường dẫn ảnh tuyệt đối hoặc public
  link?: string;
}

interface SlideShowProps {
  slides?: SlideItem[];
  autoPlayInterval?: number; // ms, mặc định 4000
}

const DEFAULT_SLIDES: SlideItem[] = [
  { id: 1, ten: "An Đam - Đồ uống nhập khẩu", photo: "/slide1.jpg", link: "/san-pham" },
  { id: 2, ten: "An Đam Store - Bia rượu ngoại", photo: "/slide2.jpg", link: "/san-pham" },
];

export default function SlideShow({
  slides = DEFAULT_SLIDES,
  autoPlayInterval = 4500,
}: SlideShowProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating, slides.length]
  );

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto play
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval, slides.length]);

  if (!slides.length) return null;

  return (
    <div className="slideshow relative w-full overflow-hidden bg-black select-none group">
      {/* Slides */}
      <div className="relative w-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`transition-opacity duration-700 ${idx === current ? "opacity-100" : "opacity-0 absolute inset-0"}`}
          >
            {slide.link ? (
              <Link href={slide.link} className="block w-full">
                {/* contain = hiển thị toàn bộ ảnh, không crop */}
                <img
                  src={slide.photo}
                  alt={slide.ten}
                  className="w-full h-auto block"
                  style={{ display: "block", maxWidth: "100%" }}
                />
              </Link>
            ) : (
              <img
                src={slide.photo}
                alt={slide.ten}
                className="w-full h-auto block"
                style={{ display: "block", maxWidth: "100%" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Nút Prev / Next - hiện khi hover vào slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Ảnh trước"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-[#b3000f] text-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Ảnh tiếp theo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-[#b3000f] text-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <FaChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? "w-6 bg-[#b3000f]" : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
