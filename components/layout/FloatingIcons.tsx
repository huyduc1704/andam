"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FloatingIcons() {
  const [icons, setIcons] = useState<any[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      const { data } = await supabase.from("floating_icons").select("*").eq("active", true).order("id", { ascending: true });
      if (data) setIcons(data);
    };
    fetchIcons();
  }, []);

  if (icons.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          70% { transform: scale(1.1) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .icon-pop {
          animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
        }
      `}</style>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {icons.map((icon, index) => (
          <a
            key={icon.id}
            href={icon.link}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-pop w-[52px] h-[52px] rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center bg-white overflow-hidden border border-gray-100"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <img src={icon.icon_url} alt={icon.name} className="w-full h-full object-cover" />
          </a>
        ))}
      </div>
    </>
  );
}
