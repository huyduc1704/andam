"use client";
// HomeSections component - chuyển từ index_tpl.php
// Gồm: 3 banner danh mục | Sản phẩm khuyến mãi | Sản phẩm theo danh mục | Banner Khám phá | Đối tác

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import ProductCard from "@/components/product/ProductCard";
import ContactSection from "@/components/home/ContactSection";

interface Product {
  id: number;
  ten: string;
  gia: number;
  photo: string;
  slug: string;
  giakm?: number;
}

interface Category {
  id: number;
  ten: string;
  slug: string;
  products?: Product[];
}

interface Partner {
  id: number;
  ten: string;
  photo: string;
  link: string;
}

interface HomeSectionsProps {
  categories?: Category[];
  partners?: Partner[];
}

const SAMPLE_BANNER_ITEMS = [
  { href: "/san-pham", src: "/belgium.jpg", alt: "Bia Đen Belgium", label: "Bia Đen Belgium" },
  { href: "/san-pham", src: "/duc.jpg", alt: "Bia Đen Đức", label: "Bia Đen Đức" },
  { href: "/san-pham", src: "/ruouvangdo.jpg", alt: "Rượu Vang Đỏ", label: "Rượu Vang Đỏ" },
];

const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 1, ten: "Bia Nhập Khẩu", slug: "bia-nhap-khau",
    products: [
      { id: 1, ten: "Bia Đen Belgium", gia: 150000, photo: "/belgium.jpg", slug: "bia-den-belgium" },
      { id: 2, ten: "Bia Đen Đức", gia: 120000, photo: "/duc.jpg", slug: "bia-den-duc" },
      { id: 3, ten: "Bia Nhập Khẩu 3", gia: 95000, photo: "/belgium.jpg", slug: "bia-nhap-khau-3" },
      { id: 4, ten: "Bia Nhập Khẩu 4", gia: 110000, photo: "/duc.jpg", slug: "bia-nhap-khau-4" },
    ]
  },
  {
    id: 2, ten: "Rượu Vang", slug: "ruou-vang",
    products: [
      { id: 5, ten: "Rượu Vang Đỏ Pháp", gia: 350000, giakm: 299000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-do-phap" },
      { id: 6, ten: "Rượu Vang Trắng", gia: 280000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-trang" },
      { id: 7, ten: "Rượu Vang Ý", gia: 420000, giakm: 369000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-y" },
      { id: 8, ten: "Rượu Vang Chile", gia: 310000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-chile" },
    ]
  },
];

export default function HomeSections({
  categories = SAMPLE_CATEGORIES,
  partners = [],
}: HomeSectionsProps) {
  const partnerRef = useRef<HTMLDivElement>(null);

  // Auto scroll đối tác
  useEffect(() => {
    const el = partnerRef.current;
    if (!el || partners.length === 0) return;
    let frame: number;
    let pos = 0;
    const speed = 0.5;
    const scroll = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [partners]);

  return (
    <>
      {/* ===== SECTION: 3 BANNERS DANH MỤC ===== */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Chuyên cung cấp đồ uống nhập khẩu
            </h2>
            <div className="w-16 h-1 bg-[#b3000f] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SAMPLE_BANNER_ITEMS.map((item) => (
              <Link
                key={item.alt}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl shadow-md block"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ aspectRatio: "4/5" }}
                />
                {/* Overlay gradient + label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                  <h3 className="text-white text-lg font-bold uppercase tracking-wide group-hover:text-[#ff6b6b] transition-colors">
                    {item.label}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION: SẢN PHẨM THEO DANH MỤC ===== */}
      {categories.map((cat) => (
        <section key={cat.id} className="py-10 bg-white/60 backdrop-blur-sm">
          <div className="max-w-[1280px] mx-auto px-4">
            {/* Tiêu đề + Xem thêm */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-7 bg-[#b3000f] rounded-full" />
                <h2 className="text-2xl font-bold text-gray-800">{cat.ten}</h2>
              </div>
              <Link
                href={`/${cat.slug}`}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#b3000f] border border-[#b3000f] px-4 py-1.5 rounded-full hover:bg-[#b3000f] hover:text-white transition-all duration-200"
              >
                Xem thêm <FaChevronRight size={10} />
              </Link>
            </div>

            {/* Grid sản phẩm */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {cat.products?.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ===== SECTION: BANNER KHÁM PHÁ (full width) ===== */}
      <section
        className="relative h-[480px] flex items-center my-4 overflow-hidden"
        style={{
          backgroundImage: "url('/banner-khampha.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay tối */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
              An Đam Store
            </h2>
            <p className="text-gray-200 text-lg mb-6">
              Chuyên cung cấp đồ uống nhập khẩu, nội địa uy tín
            </p>
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 bg-[#b3000f] hover:bg-[#8b000c] text-white font-bold px-7 py-3 rounded-full transition-all duration-200 text-sm uppercase tracking-wide"
            >
              Xem chi tiết <FaChevronRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION: MAP & LIÊN HỆ ===== */}
      <ContactSection />

      {/* ===== SECTION: ĐỐI TÁC / THƯƠNG HIỆU ===== */}
      {partners.length > 0 && (
        <section className="py-10 bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-4 mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-700 uppercase tracking-widest">
              Đối Tác & Thương Hiệu
            </h2>
            <div className="w-12 h-1 bg-[#b3000f] mx-auto mt-2 rounded-full" />
          </div>
          {/* Auto-scroll strip */}
          <div
            ref={partnerRef}
            className="flex overflow-x-hidden gap-8 items-center px-4"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Double list để tạo vòng lặp vô tận */}
            {[...partners, ...partners].map((p, idx) => (
              <Link
                key={idx}
                href={p.link || "#"}
                target="_blank"
                className="flex-shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              >
                <img src={p.photo} alt={p.ten} className="h-12 w-auto object-contain" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
