"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({ 
    ten: "", slug: "", gia: "", giakm: "", description: "", category_slug: "", photo: "" 
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(ten)")
      .order("id", { ascending: false });
      
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    if (data) setCategoriesList(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const formatPrice = (price: number) => {
    return price ? price.toLocaleString("vi-VN") + "đ" : "-";
  };

  const handleOpenModal = (prod: any = null) => {
    if (prod) {
      setEditingId(prod.id);
      setFormData({ 
        ten: prod.ten, 
        slug: prod.slug,
        gia: prod.gia?.toString() || "",
        giakm: prod.giakm?.toString() || "",
        description: prod.description || "",
        category_slug: prod.category_slug || "",
        photo: prod.photo || ""
      });
    } else {
      setEditingId(null);
      setFormData({ 
        ten: "", slug: "", gia: "", giakm: "", description: "", category_slug: categoriesList[0]?.slug || "", photo: "" 
      });
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
    const filePath = `products/${fileName}`;
    
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
    
    const submitData = {
      ...formData,
      gia: formData.gia ? Number(formData.gia) : 0,
      giakm: formData.giakm ? Number(formData.giakm) : null,
    };

    if (editingId) {
      const { error } = await supabase.from("products").update(submitData).eq("id", editingId);
      if (error) alert("Lỗi khi cập nhật: " + error.message);
      else {
        alert("Cập nhật thành công!");
        handleCloseModal();
        fetchProducts();
      }
    } else {
      const { error } = await supabase.from("products").insert([submitData]);
      if (error) alert("Lỗi khi thêm mới: " + error.message);
      else {
        alert("Thêm mới thành công!");
        handleCloseModal();
        fetchProducts();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) alert("Lỗi khi xóa: " + error.message);
      else {
        alert("Xóa thành công!");
        fetchProducts();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
          <p className="text-gray-500 mt-2">Thêm, sửa, xóa thông tin và hình ảnh sản phẩm.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#b3000f] hover:bg-[#8b000c] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
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
                        <button 
                          onClick={() => handleOpenModal(p)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                          title="Sửa"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
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

      {/* Modal Thêm/Sửa Sản phẩm */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
              <h3 className="font-bold text-lg text-gray-800">
                {editingId ? "Cập nhật Sản phẩm" : "Thêm Sản phẩm mới"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-red-500 transition-colors text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Cột trái */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tên Sản phẩm *</label>
                    <input 
                      type="text" required
                      value={formData.ten}
                      onChange={(e) => setFormData({...formData, ten: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#b3000f] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Đường dẫn (Slug) *</label>
                    <input 
                      type="text" required
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#b3000f] outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Giá bán *</label>
                      <input 
                        type="number" required
                        value={formData.gia}
                        onChange={(e) => setFormData({...formData, gia: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#b3000f] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Giá Khuyến mãi</label>
                      <input 
                        type="number"
                        value={formData.giakm}
                        onChange={(e) => setFormData({...formData, giakm: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#b3000f] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Danh mục *</label>
                    <select
                      required
                      value={formData.category_slug}
                      onChange={(e) => setFormData({...formData, category_slug: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#b3000f] outline-none bg-white"
                    >
                      <option value="" disabled>Chọn danh mục</option>
                      {categoriesList.map(cat => (
                        <option key={cat.slug} value={cat.slug}>{cat.ten}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Cột phải */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả sản phẩm</label>
                    <textarea 
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#b3000f] outline-none"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hình ảnh Sản phẩm</label>
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                        Tải ảnh lên
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden"
                          onChange={handleUploadImage}
                        />
                      </label>
                    </div>
                    {formData.photo && (
                      <div className="mt-3 p-2 border border-gray-200 rounded-lg inline-block">
                        <img src={formData.photo} alt="Preview" className="h-32 object-contain rounded" />
                      </div>
                    )}
                  </div>
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
                  disabled={saving}
                  className="bg-[#b3000f] hover:bg-[#8b000c] text-white px-5 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? "Đang lưu..." : "Lưu Sản Phẩm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
