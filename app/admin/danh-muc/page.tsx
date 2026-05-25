"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ ten: "", slug: "", active: true });
  const [saving, setSaving] = useState(false);
  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select("*").order("id", { ascending: false });
    if (!error && data) {
      setCategories(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (cat: any = null) => {
    if (cat) {
      setEditingId(cat.id);
      setFormData({ ten: cat.ten, slug: cat.slug, active: cat.active !== false });
    } else {
      setEditingId(null);
      setFormData({ ten: "", slug: "", active: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ ten: "", slug: "", active: true });
    setEditingId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    if (editingId) {
      // Update
      const { error } = await supabase.from("categories").update(formData).eq("id", editingId);
      if (error) alert("Lỗi khi cập nhật: " + error.message);
      else {
        alert("Cập nhật thành công!");
        handleCloseModal();
        fetchCategories();
      }
    } else {
      // Insert
      const { error } = await supabase.from("categories").insert([formData]);
      if (error) alert("Lỗi khi thêm mới: " + error.message);
      else {
        alert("Thêm mới thành công!");
        handleCloseModal();
        fetchCategories();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) alert("Lỗi khi xóa: " + error.message);
      else {
        alert("Xóa thành công!");
        fetchCategories();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý Danh mục</h1>
          <p className="text-gray-500 mt-2">Thêm, sửa, xóa danh mục sản phẩm (cấp 1).</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#b3000f] hover:bg-[#8b000c] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <FaPlus /> Thêm Danh mục
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm w-16">ID</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm">Tên Danh mục</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm">Đường dẫn (Slug)</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm">Trạng thái</th>
                <th className="py-4 px-6 font-semibold text-gray-700 text-sm text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">Đang tải dữ liệu...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">Chưa có danh mục nào.</td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-600">{cat.id}</td>
                    <td className="py-4 px-6 font-medium text-gray-800">{cat.ten}</td>
                    <td className="py-4 px-6 text-gray-500">{cat.slug}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${cat.active !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {cat.active !== false ? "Hiển thị" : "Đang ẩn"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => handleOpenModal(cat)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                          title="Sửa"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" 
                          title="Xóa"
                        >
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

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">
                {editingId ? "Cập nhật Danh mục" : "Thêm Danh mục mới"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-red-500 transition-colors text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tên Danh mục</label>
                  <input 
                    type="text" 
                    required
                    value={formData.ten}
                    onChange={(e) => setFormData({...formData, ten: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#b3000f] outline-none"
                    placeholder="VD: Bia Nhập Khẩu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Đường dẫn (Slug)</label>
                  <input 
                    type="text" 
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#b3000f] outline-none"
                    placeholder="VD: bia-nhap-khau"
                  />
                </div>
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                    <input 
                      type="checkbox" 
                      checked={formData.active} 
                      onChange={(e) => setFormData({...formData, active: e.target.checked})} 
                      className="w-5 h-5 accent-[#b3000f]" 
                    />
                    Hiển thị danh mục này ra ngoài web
                  </label>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="bg-[#b3000f] hover:bg-[#8b000c] text-white px-5 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? "Đang lưu..." : "Lưu Danh Mục"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
