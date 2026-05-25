"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminPartners() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        ten: "",
        link: "",
        photo: "",
        active: true,
        order_num: 0
    });

    const fetchItems = async () => {
        setLoading(true);
        const { data } = await supabase.from("partners").select("*").order("order_num", { ascending: true }).order("id", { ascending: true });
        if (data) setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleOpenModal = (item: any = null) => {
        if (item) {
            setEditingId(item.id);
            setFormData({ ten: item.ten, link: item.link || "", photo: item.photo, active: item.active, order_num: item.order_num || 0 });
        } else {
            setEditingId(null);
            setFormData({ ten: "", link: "", photo: "", active: true, order_num: 0 });
        }
        setIsModalOpen(true);
    };

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const filePath = `partners/${Date.now()}_${file.name}`;

        setSaving(true);
        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
        if (!uploadError) {
            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setFormData(prev => ({ ...prev, photo: data.publicUrl }));
        } else {
            alert("Lỗi tải ảnh: " + uploadError.message);
        }
        setSaving(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        if (editingId) {
            await supabase.from("partners").update(formData).eq("id", editingId);
        } else {
            await supabase.from("partners").insert([formData]);
        }
        setIsModalOpen(false);
        fetchItems();
        setSaving(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Xóa đối tác này?")) {
            await supabase.from("partners").delete().eq("id", id);
            fetchItems();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Quản lý Đối Tác / Thương Hiệu</h1>
                    <p className="text-gray-500 mt-2">Logo đối tác sẽ chạy tự động ở gần cuối trang chủ.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="bg-[#b3000f] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm font-medium hover:bg-[#8b000c] transition-colors">
                    <FaPlus /> Thêm Đối Tác
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700">Logo</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700">Tên Đối Tác</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700">Link Website</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700">Thứ tự</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700">Trạng thái</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="py-8 text-center text-gray-500">Đang tải dữ liệu...</td></tr>
                        ) : items.length === 0 ? (
                            <tr><td colSpan={6} className="py-8 text-center text-gray-500">Chưa có đối tác nào.</td></tr>
                        ) : items.map((item) => (
                            <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="w-20 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center p-2 rounded">
                                        <img src={item.photo} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                </td>
                                <td className="py-4 px-6 font-medium text-gray-800">{item.ten}</td>
                                <td className="py-4 px-6 text-gray-500">{item.link || "-"}</td>
                                <td className="py-4 px-6 text-gray-600">{item.order_num}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {item.active ? "Hiển thị" : "Đang ẩn"}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><FaEdit /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">{editingId ? "Sửa Đối Tác" : "Thêm Đối Tác"}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Tên Đối Tác *</label>
                                <input type="text" required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:border-[#b3000f]" value={formData.ten} onChange={e => setFormData({ ...formData, ten: e.target.value })} placeholder="VD: Heineken" />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Link Website (Tùy chọn)</label>
                                <input type="text" className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:border-[#b3000f]" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} placeholder="VD: https://..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Thứ tự ưu tiên</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:border-[#b3000f]" value={formData.order_num} onChange={e => setFormData({ ...formData, order_num: parseInt(e.target.value) || 0 })} placeholder="0" />
                                </div>
                                <div className="flex flex-col justify-center pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                                        <input type="checkbox" checked={formData.active} onChange={e => setFormData({ ...formData, active: e.target.checked })} className="w-5 h-5 accent-[#b3000f]" />
                                        Hiển thị
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Logo Đối Tác (Nên dùng nền trong suốt PNG) *</label>
                                <label className="cursor-pointer bg-gray-50 border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block mb-3">
                                    Tải ảnh lên
                                    <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" />
                                </label>
                                {formData.photo && <div className="mt-1"><img src={formData.photo} className="w-32 h-16 object-contain rounded-lg shadow-sm border border-gray-100 p-2" /></div>}
                            </div>
                            
                            <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Hủy</button>
                                <button type="submit" disabled={saving || !formData.photo} className="bg-[#b3000f] hover:bg-[#8b000c] text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50">
                                    {saving ? "Đang lưu..." : "Lưu Thay Đổi"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
