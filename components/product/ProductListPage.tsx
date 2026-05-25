import MainLayout from "@/components/layout/MainLayout";
import ProductCard, { Product } from "@/components/product/ProductCard";

interface ProductListPageProps {
  title: string;
  products: Product[];
}

export default function ProductListPage({ title, products }: ProductListPageProps) {
  return (
    <MainLayout>
      <div className="py-10 bg-white/60 backdrop-blur-sm min-h-screen">
        <div className="max-w-[1280px] mx-auto px-4">
          {/* Breadcrumb / Tiêu đề */}
          <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
              {title}
            </h1>
            <div className="w-16 h-1 bg-[#b3000f] rounded-full mt-4" />
          </div>

          {/* Grid sản phẩm - 4 sản phẩm trên một hàng trên màn hình lg+ */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">Hiện chưa có sản phẩm nào trong danh mục này.</p>
            </div>
          )}

          {/* Phân trang (Pagination) - Chờ thêm logic sau */}
          {products.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#b3000f] hover:text-white hover:border-[#b3000f] transition-colors">
                  &lt;
                </button>
                <button className="w-10 h-10 rounded-lg border border-[#b3000f] bg-[#b3000f] flex items-center justify-center text-white font-bold transition-colors">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#b3000f] hover:text-white hover:border-[#b3000f] transition-colors">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#b3000f] hover:text-white hover:border-[#b3000f] transition-colors">
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
