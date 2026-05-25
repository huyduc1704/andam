import ProductListPage from "@/components/product/ProductListPage";
import { Product } from "@/components/product/ProductCard";

const SAMPLE_PROMO_PRODUCTS: Product[] = [
  { id: 5, ten: "Rượu Vang Đỏ Pháp", gia: 350000, giakm: 299000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-do-phap" },
  { id: 7, ten: "Rượu Vang Ý", gia: 420000, giakm: 369000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-y" },
];

export default function KhuyenMaiPage() {
  return <ProductListPage title="Sản Phẩm Khuyến Mãi" products={SAMPLE_PROMO_PRODUCTS} />;
}
