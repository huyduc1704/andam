// MainLayout component - Layout chung cho tất cả các trang frontend

import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import Footer from "@/components/layout/Footer";

import { supabase } from "@/lib/supabase";

const SAMPLE_CATEGORIES = [
  { ten: "Bia Nhập Khẩu", slug: "bia-nhap-khau", photo: "" },
  { ten: "Rượu Vang", slug: "ruou-vang", photo: "" },
  { ten: "Nước Ngọt", slug: "nuoc-ngot", photo: "" },
  { ten: "Whisky", slug: "whisky", photo: "" },
  { ten: "Nước Tăng Lực", slug: "nuoc-tang-luc", photo: "" },
];

interface MainLayoutProps {
  children: React.ReactNode;
  hideFooterMap?: boolean;
}

export default async function MainLayout({ children, hideFooterMap = false }: MainLayoutProps) {
  // Fetch settings từ Supabase
  const { data: settingsData } = await supabase.from("settings").select("*");
  const settings: any = {};
  if (settingsData) {
    settingsData.forEach(item => {
      settings[item.key] = item.value;
    });
  }

  const logoHeader = settings.logo_header || "/andam-logo.png";
  const logoFooter = settings.logo_footer || "/andam-logo.png";
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/background_website.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      {/* Top bar thông tin liên hệ & mạng xã hội */}
      <TopBar />

      {/* Header / Navbar cố định khi scroll */}
      <Navbar logo={logoHeader} categories={SAMPLE_CATEGORIES} />

      {/* Body layout: LeftSidebar + nội dung chính */}
      <div className="flex xl:pl-[72px] flex-1">
        {/* Cột trái cố định - chỉ hiện trên màn hình xl trở lên */}
        <LeftSidebar logo={logoHeader} categories={SAMPLE_CATEGORIES} />

        {/* Nội dung chính của trang */}
        <main className="flex-1 min-h-screen overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer logo={logoFooter} hideMapAndContact={hideFooterMap} />
    </div>
  );
}
