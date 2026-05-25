import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaShoppingCart, FaCheckCircle, FaMinus, FaPlus } from "react-icons/fa";

// Mock data
const SAMPLE_PRODUCTS = [
  { id: 1, ten: "Bia Đen Belgium", gia: 150000, photo: "/belgium.jpg", slug: "bia-den-belgium", category: "Bia Nhập Khẩu", desc: "Bia đen đậm đà hương vị truyền thống Bỉ. Phù hợp cho những bữa tiệc sang trọng." },
  { id: 2, ten: "Bia Đen Đức", gia: 120000, photo: "/duc.jpg", slug: "bia-den-duc", category: "Bia Nhập Khẩu", desc: "Sản xuất từ hoa bia tươi Đức, hương thơm nhẹ nhàng và vị đắng nhẹ đặc trưng." },
  { id: 3, ten: "Rượu Vang Đỏ Pháp", gia: 350000, giakm: 299000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-do-phap", category: "Rượu Vang", desc: "Rượu vang đỏ cao cấp từ vùng Bordeaux nước Pháp. Phù hợp cho bữa tối lãng mạn." },
  { id: 4, ten: "Rượu Vang Ý", gia: 420000, giakm: 369000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-y", category: "Rượu Vang", desc: "Tuyệt tác từ Ý, vị chát mượt mà kết hợp hương trái cây nhiệt đới." },
];

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  // Lấy chi tiết sản phẩm (mock)
  const product = SAMPLE_PRODUCTS.find(p => p.slug === slug);
  
  if (!product) {
    // Để demo, nếu không tìm thấy slug, hiển thị tạm sản phẩm đầu tiên
    // notFound();
  }
  
  const displayProduct = product || SAMPLE_PRODUCTS[0];

  return (
    <MainLayout>
      <div className="py-10 bg-white/60 backdrop-blur-sm min-h-screen">
        <div className="max-w-[1280px] mx-auto px-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <Link href="/" className="hover:text-[#b3000f] transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/san-pham" className="hover:text-[#b3000f] transition-colors">Sản phẩm</Link>
            <span>/</span>
            <span className="text-[#b3000f]">{displayProduct.category}</span>
          </nav>

          {/* Chi tiết sản phẩm */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-10 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Cột trái: Ảnh */}
              <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-xl overflow-hidden border border-gray-100 p-4">
                <img
                  src={displayProduct.photo}
                  alt={displayProduct.ten}
                  className="w-full h-full object-contain"
                />
                {displayProduct.giakm && (
                  <span className="absolute top-4 left-4 bg-[#b3000f] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                    GIẢM GIÁ
                  </span>
                )}
              </div>

              {/* Cột phải: Thông tin */}
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  {displayProduct.ten}
                </h1>
                
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                  {displayProduct.giakm ? (
                    <>
                      <span className="text-3xl font-bold text-[#b3000f]">{formatPrice(displayProduct.giakm)}</span>
                      <span className="text-xl text-gray-400 line-through">{formatPrice(displayProduct.gia)}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-[#b3000f]">{formatPrice(displayProduct.gia)}</span>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {displayProduct.desc}
                  </p>
                  <ul className="space-y-2 mt-4 text-gray-700">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Cam kết hàng chính hãng 100%</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Giao hàng siêu tốc 2h trong nội thành</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Đổi trả trong 7 ngày nếu lỗi do NSX</li>
                  </ul>
                </div>

                {/* Nút Mua */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <button className="flex-1 bg-[#b3000f] hover:bg-[#8b000c] text-white text-lg font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-red-500/30">
                    <FaShoppingCart /> Thêm Vào Giỏ Hàng
                  </button>
                  <button className="flex-1 bg-gray-800 hover:bg-black text-white text-lg font-bold py-4 rounded-xl transition-colors">
                    Mua Ngay
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
