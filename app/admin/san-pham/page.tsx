"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    // Join with categories table to get category name
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(ten)")
      .order("id", { ascending: false });
      
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return price ? price.toLocaleString("vi-VN") + "đ" : "-";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
          <p className="text-gray-500 mt-2">Thêm, sửa, xóa thông tin và hình ảnh sản phẩm.</p>
        </div>
        <button className="bg-[#b3000f] hover:bg-[#8b000c] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <FaPlus /> Thêm Sản phẩm
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm w-16">ID</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm w-24">Hình ảnh</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm">Tên Sản phẩm</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm">Danh mục</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm">Giá bán</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm">Giá KM</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">Đang tải dữ liệu...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">Chưa có sản phẩm nào.</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-600">{p.id}</td>
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 rounded border border-gray-200 overflow-hidden bg-gray-100">
                        {p.photo ? (
                          <img src={p.photo} alt={p.ten} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-gray-400 flex items-center justify-center h-full">No img</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800">{p.ten}</td>
                    <td className="py-4 px-6 text-gray-600">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {p.categories?.ten || p.category_slug}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{formatPrice(p.gia)}</td>
                    <td className="py-4 px-6 text-[#b3000f] font-semibold">{formatPrice(p.giakm)}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Sửa">
                          <FaEdit />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Xóa">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
