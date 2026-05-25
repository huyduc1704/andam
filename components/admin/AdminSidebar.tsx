"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBox, FaList, FaImages, FaCog, FaSignOutAlt, FaGlobe, FaBars, FaHandshake } from "react-icons/fa";

const ADMIN_LINKS = [
  { name: "Tổng quan", href: "/admin", icon: FaHome },
  { name: "Danh mục", href: "/admin/danh-muc", icon: FaList },
  { name: "Sản phẩm", href: "/admin/san-pham", icon: FaBox },
  { name: "Slideshow", href: "/admin/slides", icon: FaImages },
  { name: "Quản lý Icon Nổi", href: "/admin/icons", icon: FaGlobe },
  { name: "Menu Trái", href: "/admin/sidebar", icon: FaBars },
  { name: "Đối Tác", href: "/admin/doi-tac", icon: FaHandshake },
  { name: "Cấu hình chung", href: "/admin/cai-dat", icon: FaCog },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#111827] text-white min-h-screen flex flex-col fixed left-0 top-0 bottom-0 shadow-xl z-50">
      <div className="p-6 border-b border-gray-800 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-[#ff4d4d] tracking-wider uppercase">
          An Đam Admin
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {ADMIN_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-[#b3000f] text-white font-semibold"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200">
          <FaSignOutAlt size={18} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
