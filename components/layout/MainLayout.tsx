// MainLayout component - Layout chung cho tất cả các trang frontend

import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import Footer from "@/components/layout/Footer";
import FloatingIcons from "@/components/layout/FloatingIcons";

import { supabase } from "@/lib/supabase";



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

  // Fetch categories từ Supabase
  const { data: categoriesData } = await supabase.from("categories").select("*").eq("active", true).order("id", { ascending: true });
  const categories = categoriesData || [];

  // Fetch sidebar items
  const { data: sidebarItemsData } = await supabase.from("sidebar_items").select("*").eq("active", true).order("order_num", { ascending: true }).order("id", { ascending: true });
  const sidebarItems = sidebarItemsData || [];

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
      <Navbar logo={logoHeader} categories={categories} />

      {/* Body layout: LeftSidebar + nội dung chính */}
      <div className="flex xl:pl-[72px] flex-1">
        {/* Cột trái cố định - chỉ hiện trên màn hình xl trở lên */}
        <LeftSidebar logo={logoHeader} items={sidebarItems} />

        {/* Nội dung chính của trang */}
        <main className="flex-1 min-h-screen overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer logo={logoFooter} />
      
      {/* Icon Nổi */}
      <FloatingIcons />
    </div>
  );
}
