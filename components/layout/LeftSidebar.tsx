"use client";
// Component tương đương left-menu.php - Cột menu cố định bên trái, hiển thị logo + danh mục sản phẩm

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaWineGlassAlt } from "react-icons/fa";

interface Category {
  ten: string;
  slug: string;
  photo?: string;
}

interface LeftSidebarProps {
  logo?: string;
  categories?: Category[];
}

export default function LeftSidebar({
  logo = "/logo.png",
  categories = [],
}: LeftSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="left-fixed-menu hidden xl:flex flex-col items-center py-4 w-[72px] fixed left-0 top-0 h-screen bg-white border-r border-gray-200 shadow-md z-[60] overflow-y-auto overflow-x-hidden">
      {/* Logo nhỏ */}
      <div className="mb-5 px-2">
        <Link href="/" aria-label="Trang chủ">
          <Image
            src={logo}
            alt="An Đam Logo"
            width={160}
            height={80}
            className="object-contain max-h-[60px] w-auto"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
      </div>

      {/* Danh sách danh mục */}
      <ul className="list-none m-0 p-0 text-center w-full space-y-3">
        {categories.map((cat) => {
          const isActive = pathname.startsWith(`/${cat.slug}`);
          return (
            <li key={cat.slug}>
              <Link
                href={`/${cat.slug}`}
                title={cat.ten}
                className={`flex flex-col items-center justify-center mx-auto w-[52px] h-[52px] rounded-xl transition-all duration-200 group relative
                  ${isActive ? "bg-[#b3000f]" : "hover:bg-red-50"}`}
              >
                {cat.photo ? (
                  <Image
                    src={`/upload/product/${cat.photo}`}
                    alt={cat.ten}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <FaWineGlassAlt
                    size={20}
                    className={`transition-colors ${isActive ? "text-[#b3000f]" : "text-gray-400 group-hover:text-[#b3000f]"}`}
                  />
                )}

                {/* Tooltip tên danh mục */}
                <span className="absolute left-full ml-2 px-2 py-1 text-xs text-white bg-[#b3000f] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                  {cat.ten}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
