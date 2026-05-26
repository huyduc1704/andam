"use client";
// Component tương đương left-menu.php - Cột menu cố định bên trái, hiển thị logo + danh mục sản phẩm

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaWineGlassAlt } from "react-icons/fa";

interface SidebarItem {
  id: number;
  name: string;
  link: string;
  icon_url: string;
  active: boolean;
}

interface LeftSidebarProps {
  logo?: string;
  items?: SidebarItem[];
}

export default function LeftSidebar({
  logo = "/logo.png",
  items = [],
}: LeftSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="left-fixed-menu hidden xl:flex flex-col items-center py-4 w-[72px] fixed left-0 top-0 h-[80vh] bg-white border-r border-b border-gray-200 shadow-md z-[60] overflow-y-auto overflow-x-hidden">
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

      {/* Danh sách Sidebar Items */}
      <ul className="list-none m-0 p-0 text-center w-full space-y-3">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.link) && item.link !== "/";
          return (
            <li key={item.id}>
              <Link
                href={item.link}
                title={item.name}
                className="flex flex-col items-center justify-center mx-auto w-[52px] h-[52px] rounded-xl transition-all duration-200 group relative hover:scale-110 hover:bg-gray-50"
              >
                {item.icon_url ? (
                  <Image
                    src={item.icon_url}
                    alt={item.name}
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

                {/* Tooltip tên item */}
                <span className="absolute left-full ml-2 px-2 py-1 text-xs text-white bg-[#b3000f] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
