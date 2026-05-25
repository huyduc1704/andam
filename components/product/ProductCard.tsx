import Link from "next/link";

export interface Product {
  id: number;
  ten: string;
  gia: number;
  photo: string;
  slug: string;
  giakm?: number;
}

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.photo}
          alt={product.ten}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.giakm && (
          <span className="absolute top-2 left-2 bg-[#b3000f] text-white text-xs font-bold px-2 py-1 rounded-full">
            SALE
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-[#b3000f] transition-colors flex-1">
          {product.ten}
        </h3>
        <div className="flex items-center gap-2">
          {product.giakm ? (
            <>
              <span className="text-[#b3000f] font-bold text-sm">{formatPrice(product.giakm)}</span>
              <span className="text-gray-400 text-xs line-through">{formatPrice(product.gia)}</span>
            </>
          ) : (
            <span className="text-[#b3000f] font-bold text-sm">{formatPrice(product.gia)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
