"use client";
// Footer component - chuyển từ footer.php
// Gồm: Map + Form liên hệ, thông tin footer 4 cột, copyright

import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

const FOOTER_LINKS_CHINH_SACH_1 = [
  { ten: "Hướng dẫn mua hàng", slug: "huong-dan-mua-hang" },
  { ten: "Chăm sóc khách hàng", slug: "cham-soc-khach-hang" },
  { ten: "Trả hàng, hoàn tiền", slug: "tra-hang-hoan-tien" },
  { ten: "Hình thức thanh toán", slug: "hinh-thuc-thanh-toan" },
  { ten: "Chính sách bảo hành", slug: "chinh-sach-bao-hanh" },
];

const FOOTER_LINKS_CHINH_SACH_2 = [
  { ten: "Sản phẩm khuyến mãi", slug: "san-pham-khuyen-mai" },
  { ten: "Nước ngọt", slug: "nuoc-ngot" },
  { ten: "Bia nhập khẩu", slug: "bia-nhap-khau" },
  { ten: "Rượu nhập khẩu", slug: "ruou-nhap-khau" },
  { ten: "Sản phẩm khác", slug: "san-pham-khac" },
];

interface FooterProps {
  logo?: string;
  companyName?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export default function Footer({
  logo = "/andam-logo.png",
  companyName = "An Đam Energy & Beverage",
  address = "1A1 Giải Phóng, Phường Tân Sơn Nhất, TP. Hồ Chí Minh",
  phone = "0987 142 536",
  email = "andammonsterenergy@gmail.com",
  website = "www.andam.vn",
}: FooterProps) {
  return (
    <footer>
      {/* === PHẦN FOOTER CHÍNH === */}
      <div
        className="mt-2"
        style={{
          backgroundImage: "url('/background-header-footer.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1350px] mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Cột 1: Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src={logo}
                  alt={companyName}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Cột 2: Thông tin liên hệ */}
            <div className="flex-1 lg:max-w-xs xl:max-w-sm">
              <h3 className="text-white font-bold text-lg uppercase tracking-wide mb-5">
                {companyName}
              </h3>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="flex gap-3">
                  <FaMapMarkerAlt className="mt-0.5 text-white flex-shrink-0" />
                  <span>{address}</span>
                </li>
                <li className="flex gap-3 items-center">
                  <FaPhoneAlt className="text-white flex-shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
                </li>
                <li className="flex gap-3 items-center">
                  <FaEnvelope className="text-white flex-shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors break-all">{email}</a>
                </li>
                <li className="flex gap-3 items-center">
                  <FaGlobe className="text-white flex-shrink-0" />
                  <span>{website}</span>
                </li>
              </ul>
              {/* Social icons */}
              <div className="flex gap-4 mt-6">
                <Link href="#" aria-label="Facebook" className="text-white hover:text-gray-300 transition-colors">
                  <FaFacebookF size={18} />
                </Link>
                <Link href="#" aria-label="Instagram" className="text-white hover:text-gray-300 transition-colors">
                  <FaInstagram size={18} />
                </Link>
                <Link href="#" aria-label="TikTok" className="text-white hover:text-gray-300 transition-colors">
                  <FaTiktok size={18} />
                </Link>
              </div>
            </div>

            {/* Cột 3: Chính sách 1 */}
            <div className="flex-1 lg:max-w-[200px]">
              <h3 className="text-white font-bold text-lg mb-5">
                Chính Sách
              </h3>
              <ul className="space-y-4">
                {FOOTER_LINKS_CHINH_SACH_1.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className="text-gray-300 hover:text-white text-sm transition-colors block"
                    >
                      {item.ten}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột 4: Chính sách 2 */}
            <div className="flex-shrink-0 lg:w-[200px] lg:text-left text-left">
              <h3 className="text-white font-bold text-lg mb-5">
                Chính Sách
              </h3>
              <ul className="space-y-4">
                {FOOTER_LINKS_CHINH_SACH_2.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className="text-gray-300 hover:text-white text-sm transition-colors block"
                    >
                      {item.ten}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-[#b3000f] py-4">
          <div className="max-w-[1350px] mx-auto px-4 text-center">
            <p className="text-white text-sm m-0">
              © {new Date().getFullYear()} <strong className="font-bold uppercase">{companyName}</strong>, Designed by Vina Software (VNS) VIETNAM. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
