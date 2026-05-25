import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard - An Đam Energy",
  description: "Trang quản trị hệ thống An Đam Energy",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
