"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FaSave } from "react-icons/fa";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    company_name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    logo_header: "",
    logo_footer: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("settings").select("*");
    if (!error && data) {
      const newSettings = { ...settings };
      data.forEach((item: any) => {
        (newSettings as any)[item.key] = item.value;
      });
      setSettings(newSettings);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `logos/${fileName}`;
    
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
    setSettings(prev => ({ ...prev, [key]: data.publicUrl }));
    setSaving(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Lưu từng key vào bảng settings
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value
    }));

    const { error } = await supabase.from("settings").upsert(updates);
    
    setSaving(false);
    if (!error) {
      alert("Lưu cấu hình thành công!");
    } else {
      alert("Có lỗi xảy ra khi lưu!");
    }
  };

  if (loading) return <div className="py-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Cấu hình chung</h1>
        <p className="text-gray-500 mt-2">Thay đổi thông tin liên hệ, logo và các cài đặt chung khác.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tên Công Ty</label>
              <input 
                type="text" 
                value={settings.company_name}
                onChange={(e) => setSettings({...settings, company_name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#b3000f] focus:ring-1 focus:ring-[#b3000f] outline-none transition-colors"
                placeholder="VD: An Đam Energy & Beverage"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số Điện Thoại</label>
              <input 
                type="text" 
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#b3000f] focus:ring-1 focus:ring-[#b3000f] outline-none transition-colors"
                placeholder="VD: 0987 142 536"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Địa Chỉ</label>
              <input 
                type="text" 
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#b3000f] focus:ring-1 focus:ring-[#b3000f] outline-none transition-colors"
                placeholder="VD: 1A1 Giải Phóng..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#b3000f] focus:ring-1 focus:ring-[#b3000f] outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
              <input 
                type="text" 
                value={settings.website}
                onChange={(e) => setSettings({...settings, website: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#b3000f] focus:ring-1 focus:ring-[#b3000f] outline-none transition-colors"
              />
            </div>

            <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Logo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Logo Header</label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors">
                      Tải ảnh lên
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUploadImage(e, "logo_header")}
                      />
                    </label>
                    {settings.logo_header && <span className="text-sm text-green-600">Đã có ảnh</span>}
                  </div>
                  {settings.logo_header && (
                    <div className="mt-3 bg-gray-50 p-4 rounded-lg flex justify-center border border-gray-100">
                      <img src={settings.logo_header} alt="Logo Header" className="h-12 object-contain" />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Logo Footer</label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors">
                      Tải ảnh lên
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUploadImage(e, "logo_footer")}
                      />
                    </label>
                    {settings.logo_footer && <span className="text-sm text-green-600">Đã có ảnh</span>}
                  </div>
                  {settings.logo_footer && (
                    <div className="mt-3 bg-gray-50 p-4 rounded-lg flex justify-center border border-gray-100">
                      <img src={settings.logo_footer} alt="Logo Footer" className="h-12 object-contain" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-[#b3000f] hover:bg-[#8b000c] text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <FaSave /> {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
