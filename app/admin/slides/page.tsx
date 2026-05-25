"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminSlides() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({ 
    link: "", photo: "", active: true 
  });

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

  const handleOpenModal = (slide: any = null) => {
    if (slide) {
      setEditingId(slide.id);
      setFormData({ 
        link: slide.link || "", 
        photo: slide.photo || "",
        active: slide.active !== false
      });
    } else {
      setEditingId(null);
      setFormData({ link: "", photo: "", active: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `slides/${fileName}`;
    
    setSaving(true);
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      alert("Lỗi upload: " + uploadError.message);
      setSaving(false);
      return;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    setFormData(prev => ({ ...prev, photo: data.publicUrl }));
    setSaving(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    if (editingId) {
      const { error } = await supabase.from("slides").update(formData).eq("id", editingId);
      if (error) alert("Lỗi khi cập nhật: " + error.message);
      else {
        alert("Cập nhật thành công!");
        handleCloseModal();
        fetchSlides();
      }
    } else {
      const { error } = await supabase.from("slides").insert([formData]);
      if (error) alert("Lỗi khi thêm mới: " + error.message);
      else {
        alert("Thêm mới thành công!");
        handleCloseModal();
        fetchSlides();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa slide này?")) {
      const { error } = await supabase.from("slides").delete().eq("id", id);
      if (error) alert("Lỗi khi xóa: " + error.message);
      else {
        alert("Xóa thành công!");
        fetchSlides();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý Slideshow</h1>
          <p className="text-gray-500 mt-2">Thêm, sửa, xóa các hình ảnh trình chiếu ở trang chủ.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#b3000f] hover:bg-[#8b000c] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
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
                        <button 
                          onClick={() => handleOpenModal(s)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                          title="Sửa"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(s.id)}
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

      {/* Modal Thêm/Sửa Slide */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
              <h3 className="font-bold text-lg text-gray-800">
                {editingId ? "Cập nhật Slide" : "Thêm Slide mới"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-red-500 transition-colors text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-5">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hình ảnh Slide *</label>
                  <div className="flex flex-col items-start gap-4">
                    <label className="cursor-pointer bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                      Tải ảnh lên (Tỉ lệ tham khảo 1920x600)
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadImage}
                      />
                    </label>
                    {formData.photo && (
                      <div className="p-2 border border-gray-200 rounded-lg w-full">
                        <img src={formData.photo} alt="Preview" className="w-full h-auto max-h-48 object-contain rounded" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Đường dẫn khi click (Link) (Tùy chọn)</label>
                  <input 
                    type="text" 
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    placeholder="VD: /san-pham/bia-nhap-khau"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#b3000f] outline-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    className="w-5 h-5 accent-[#b3000f]"
                  />
                  <label htmlFor="active" className="text-sm font-semibold text-gray-700 cursor-pointer">
                    Hiển thị Slide này ra ngoài Trang chủ
                  </label>
                </div>
                
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  disabled={saving || !formData.photo}
                  className="bg-[#b3000f] hover:bg-[#8b000c] text-white px-5 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? "Đang lưu..." : "Lưu Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
