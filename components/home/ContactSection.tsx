"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface ContactSectionProps {
  googleMapSrc?: string;
}

export default function ContactSection({
  googleMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0!2d106.6!3d10.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ4JzAwLjAiTiAxMDbCsDM2JzAwLjAiRQ!5e0!3m2!1svi!2s!4v1620000000000!5m2!1svi!2s",
}: ContactSectionProps) {
  const [form, setForm] = useState({ ten: "", dienthoai: "", email: "", noidung: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // TODO: gọi API gửi form
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    setForm({ ten: "", dienthoai: "", email: "", noidung: "" });
  };

  return (
    <section className="py-12 bg-white/80 backdrop-blur-sm">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Google Map - chiếm 7/12 cột */}
          <div className="md:col-span-7">
            <div className="w-full h-full min-h-[480px] rounded-[20px] overflow-hidden shadow-lg">
              <iframe
                src={googleMapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "480px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - An Đam"
              />
            </div>
          </div>

          {/* Form liên hệ - chiếm 5/12 cột */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-[20px] shadow-lg p-8 h-full">
              <h3 className="text-center text-2xl font-bold text-[#b3000f] mb-6">Liên Hệ</h3>

              {sent ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <p className="text-green-600 font-semibold">Gửi thành công!</p>
                  <p className="text-gray-500 text-sm mt-1">Chúng tôi sẽ liên hệ lại sớm nhất.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-[#b3000f] text-sm underline"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    required
                    value={form.ten}
                    onChange={(e) => setForm({ ...form, ten: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#b3000f] transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    required
                    value={form.dienthoai}
                    onChange={(e) => setForm({ ...form, dienthoai: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#b3000f] transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#b3000f] transition-colors"
                  />
                  <textarea
                    placeholder="Lời nhắn"
                    rows={4}
                    required
                    value={form.noidung}
                    onChange={(e) => setForm({ ...form, noidung: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#b3000f] transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-[#b3000f] hover:bg-[#8b000c] text-white font-bold uppercase rounded-lg py-3.5 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                  >
                    {sending ? "Đang gửi..." : <>Gửi ngay <FaPaperPlane /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
