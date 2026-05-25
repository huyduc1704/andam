"use client";
// Component tương đương menu.php - Header chính với logo, navigation menu và search box

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

interface MenuItem {
  ten: string;
  slug: string;
}

interface NavbarProps {
  logo?: string;
  categories?: MenuItem[];
}

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/", com: "" },
  { label: "Danh mục sản phẩm", href: "/san-pham", com: "san-pham" },
  { label: "Khuyến mãi", href: "/khuyen-mai", com: "khuyen-mai" },
  { label: "Liên hệ", href: "/lien-he", com: "lien-he" },
];

export default function Navbar({ logo = "/logo.png", categories = [] }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/san-pham?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="menu-andam sticky top-0 z-50 shadow-lg"
      style={{
        backgroundImage: "url('/background-header-footer.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-[80px]">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center h-full">
          <Link href="/" className="flex items-center h-full">
            <Image
              src={logo}
              alt="An Đam Logo"
              width={160}
              height={80}
              className="object-contain max-h-[70px] w-auto"
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-1 m-0 p-0 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 rounded-sm block
                    ${isActive(item.href)
                      ? "text-white bg-[#b3000f]"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {item.label}
                </Link>
                {item.com === "san-pham" && categories.length > 0 && (
                  <ul className="absolute top-full left-0 w-full bg-[#1a1a2e] border border-white/10 shadow-2xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 list-none p-0">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/${cat.slug}`}
                          className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#b3000f] transition-colors"
                        >
                          {cat.ten}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Search Box */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center bg-white rounded-full px-3 py-1.5 gap-2 w-[230px]">
            <button
              onClick={handleSearch}
              aria-label="Tìm kiếm"
              className="text-[#b3000f] cursor-pointer hover:text-red-700 transition-colors"
            >
              <FaSearch size={14} />
            </button>
            <input
              type="text"
              id="keyword_menu"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Bạn muốn tìm kiếm gì?"
              className="border-0 bg-transparent text-gray-600 text-sm outline-none w-full placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#111827] border-t border-white/10 px-4 pb-4">
          {/* Mobile Search */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 gap-2 mt-3 mb-3">
            <FaSearch size={14} className="text-[#b3000f]" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tìm kiếm..."
              className="border-0 bg-transparent text-gray-600 text-sm outline-none w-full"
            />
          </div>
          <ul className="list-none p-0 m-0 space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded text-sm font-semibold transition-colors
                    ${isActive(item.href)
                      ? "bg-[#b3000f] text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
