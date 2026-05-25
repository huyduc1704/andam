"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminSlides() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSlides = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("slides")
      .select("*")
      .order("id", { ascending: false });
      
    if (!error && data) {
      setSlides(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý Slideshow</h1>
          <p className="text-gray-500 mt-2">Thêm, sửa, xóa các hình ảnh trình chiếu ở trang chủ.</p>
        </div>
        <button className="bg-[#b3000f] hover:bg-[#8b000c] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <FaPlus /> Thêm Slide
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm w-16">ID</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm w-48">Hình ảnh</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm">Đường dẫn (Link)</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm">Trạng thái</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">Đang tải dữ liệu...</td>
                </tr>
              ) : slides.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">Chưa có slide nào.</td>
                </tr>
              ) : (
                slides.map((s) => (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-600">{s.id}</td>
                    <td className="py-4 px-6">
                      <div className="w-32 h-16 rounded border border-gray-200 overflow-hidden bg-gray-100">
                        {s.photo ? (
                          <img src={s.photo} alt={`Slide ${s.id}`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-gray-400 flex items-center justify-center h-full">No img</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-500">{s.link || "Không có"}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${s.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {s.active ? "Đang hiển thị" : "Đang ẩn"}
                      </span>
                    </td>
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
