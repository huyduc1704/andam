import { FaBox, FaList, FaImages } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Tắt cache để luôn lấy dữ liệu mới

export default async function AdminDashboard() {
  const [{ count: productsCount }, { count: categoriesCount }, { count: slidesCount }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("slides").select("*", { count: "exact", head: true })
  ]);
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tổng Quan</h1>
        <p className="text-gray-500 mt-2">Chào mừng bạn đến với trang quản trị hệ thống An Đam Energy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
            <FaBox />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tổng Sản Phẩm</p>
            <h3 className="text-2xl font-bold text-gray-800">{productsCount || 0}</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl">
            <FaList />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Danh Mục</p>
            <h3 className="text-2xl font-bold text-gray-800">{categoriesCount || 0}</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">
            <FaImages />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Slideshow</p>
            <h3 className="text-2xl font-bold text-gray-800">{slidesCount || 0}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

