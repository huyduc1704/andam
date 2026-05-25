import ProductListPage from "@/components/product/ProductListPage";
import { Product } from "@/components/product/ProductCard";

const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, ten: "Bia Đen Belgium", gia: 150000, photo: "/belgium.jpg", slug: "bia-den-belgium" },
  { id: 2, ten: "Bia Đen Đức", gia: 120000, photo: "/duc.jpg", slug: "bia-den-duc" },
  { id: 3, ten: "Bia Nhập Khẩu 3", gia: 95000, photo: "/belgium.jpg", slug: "bia-nhap-khau-3" },
  { id: 4, ten: "Bia Nhập Khẩu 4", gia: 110000, photo: "/duc.jpg", slug: "bia-nhap-khau-4" },
  { id: 5, ten: "Rượu Vang Đỏ Pháp", gia: 350000, giakm: 299000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-do-phap" },
  { id: 6, ten: "Rượu Vang Trắng", gia: 280000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-trang" },
  { id: 7, ten: "Rượu Vang Ý", gia: 420000, giakm: 369000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-y" },
  { id: 8, ten: "Rượu Vang Chile", gia: 310000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-chile" },
];

export default function SanPhamPage() {
  return <ProductListPage title="Danh Mục Sản Phẩm" products={SAMPLE_PRODUCTS} />;
}
