// Component tương đương banner.php - Top bar hiển thị mạng xã hội, số điện thoại, địa chỉ, email

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

interface TopBarProps {
  phone?: string;
  address?: string;
  email?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

export default function TopBar({
  phone = "0987 142 536",
  address = "1A1 Giải Phóng, Phường Tân Sơn Nhất, Thành phố Hồ Chí Minh",
  email = "andammonsterenergy@gmail.com",
  facebookUrl = "#",
  instagramUrl = "#",
  tiktokUrl = "#",
}: TopBarProps) {
  return (
    <div
      className="top-bar-andam"
      style={{
        backgroundImage: "url('/background-header-footer.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 flex justify-between items-center py-2">
        {/* Trái: Mạng xã hội + Điện thoại */}
        <div className="flex items-center gap-3">
          <Link
            href={facebookUrl}
            target="_blank"
            className="text-white hover:text-blue-400 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF size={14} />
          </Link>
          <Link
            href={instagramUrl}
            target="_blank"
            className="text-white hover:text-pink-400 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={14} />
          </Link>
          <Link
            href={tiktokUrl}
            target="_blank"
            className="text-white hover:text-gray-300 transition-colors mr-2"
            aria-label="TikTok"
          >
            <FaTiktok size={14} />
          </Link>
          <span className="text-white font-semibold text-sm flex items-center gap-2">
            <FaPhoneAlt size={12} />
            {phone}
          </span>
        </div>

        {/* Giữa: Địa chỉ */}
        <div className="hidden md:block">
          <span className="text-white text-sm flex items-center gap-2">
            <FaMapMarkerAlt size={12} />
            {address}
          </span>
        </div>

        {/* Phải: Email */}
        <div className="hidden lg:block">
          <span className="text-white text-sm flex items-center gap-2">
            <FaEnvelope size={12} />
            {email}
          </span>
        </div>
      </div>
    </div>
  );
}
