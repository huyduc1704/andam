"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminIcons() {
    const [icons, setIcons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        link: "",
        icon_url: "",
        active: true
    });

    const fetchIcons = async () => {
        setLoading(true);
        const { data } = await supabase.from("floating_icons").select("*").order("id", { ascending: true });
        if (data) setIcons(data);
        setLoading(false);
    };

    const handleOpenModal = (icon: any = null) => {
        if (icon) {
            setEditingId(icon.id);
            setFormData({ name: icon.name, link: icon.link, icon_url: icon.icon_url, active: icon.active });
        } else {
            setEditingId(null);
            setFormData({ name: "", link: "", icon_url: "", active: true });
        }
        setIsModalOpen(true);
    };

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const filePath = `icons/${Date.now()}_${file.name}`;

        setSaving(true);
        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
        if (!uploadError) {
            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setFormData(prev => ({ ...prev, icon_url: data.publicUrl }));
        }
        setSaving(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        if (editingId) {
            await supabase.from("floating_icons").update(formData).eq("id", editingId);
        } else {
            await supabase.from("floating_icons").insert([formData]);
        }
        setIsModalOpen(false);
        fetchIcons();
        setSaving(false);
    };
    const handleDelete = async (id: number) => {
        if (confirm("Xóa icon này?")) {
            await supabase.from("floating_icons").delete().eq("id", id);
            fetchIcons();
        }
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Quản lý Icon Nổi</h1>
                <button onClick={() => handleOpenModal()} className="bg-[#b3000f] text-white px-5 py-2.5 rounded-lg flex items-center gap-2">
                    <FaPlus /> Thêm Icon
                </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="py-4 px-6">Tên</th>
                            <th className="py-4 px-6">Hình ảnh</th>
                            <th className="py-4 px-6">Link</th>
                            <th className="py-4 px-6 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {icons.map((icon) => (
                            <tr key={icon.id} className="border-b">
                                <td className="py-4 px-6">{icon.name}</td>
                                <td className="py-4 px-6"><img src={icon.icon_url} alt="" className="w-10 h-10 object-contain rounded-full border" /></td>
                                <td className="py-4 px-6">{icon.link}</td>
                                <td className="py-4 px-6 text-right">
                                    <button onClick={() => handleOpenModal(icon)} className="p-2 text-blue-600"><FaEdit /></button>
                                    <button onClick={() => handleDelete(icon.id)} className="p-2 text-red-600"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h3 className="font-bold text-lg mb-4">{editingId ? "Sửa Icon" : "Thêm Icon"}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div><label className="block mb-1 font-medium">Tên (VD: Zalo) *</label><input type="text" required className="w-full border border-gray-300 p-2 rounded-lg outline-none focus:border-[#b3000f]" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                            <div><label className="block mb-1 font-medium">Link chuyển hướng</label><input type="text" className="w-full border border-gray-300 p-2 rounded-lg outline-none focus:border-[#b3000f]" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} placeholder="Tùy chọn" /></div>
                            <div>
                                <label className="block mb-2 font-medium">Hình ảnh Icon *</label>
                                <label className="cursor-pointer bg-gray-50 border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block mb-3">
                                    Tải ảnh lên
                                    <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" />
                                </label>
                                {formData.icon_url && <div className="mt-1"><img src={formData.icon_url} className="w-14 h-14 object-contain rounded-full shadow-sm border border-gray-100" /></div>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Hủy</button>
                                <button type="submit" disabled={saving} className="bg-[#b3000f] text-white px-4 py-2 rounded">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}