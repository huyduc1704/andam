import ProductListPage from "@/components/product/ProductListPage";
import { Product } from "@/components/product/ProductCard";
import { notFound } from "next/navigation";

// Mock data
const CATEGORIES = [
  { ten: "Bia Nhập Khẩu", slug: "bia-nhap-khau" },
  { ten: "Rượu Vang", slug: "ruou-vang" },
  { ten: "Nước Ngọt", slug: "nuoc-ngot" },
  { ten: "Whisky", slug: "whisky" },
  { ten: "Nước Tăng Lực", slug: "nuoc-tang-luc" },
];

const SAMPLE_PRODUCTS: any[] = [
  { id: 1, ten: "Bia Đen Belgium", gia: 150000, photo: "/belgium.jpg", slug: "bia-den-belgium", category: "bia-nhap-khau" },
  { id: 2, ten: "Bia Đen Đức", gia: 120000, photo: "/duc.jpg", slug: "bia-den-duc", category: "bia-nhap-khau" },
  { id: 3, ten: "Rượu Vang Đỏ Pháp", gia: 350000, giakm: 299000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-do-phap", category: "ruou-vang" },
  { id: 4, ten: "Rượu Vang Ý", gia: 420000, giakm: 369000, photo: "/ruouvangdo.jpg", slug: "ruou-vang-y", category: "ruou-vang" },
];

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // Find category name
  const category = CATEGORIES.find(c => c.slug === slug);
  if (!category) {
    notFound(); // Not a category, let Next.js show 404 or handle other routes
  }

  // Lọc sản phẩm theo danh mục (mock)
  const products = SAMPLE_PRODUCTS.filter(p => (p as any).category === slug);

  // Nếu không có sản phẩm nào thuộc danh mục này nhưng danh mục hợp lệ, ta hiển thị danh sách rỗng (hoặc mock data để test)
  const displayProducts = products.length > 0 ? products : SAMPLE_PRODUCTS.map((p, idx) => ({...p, id: idx + 100}));

  return <ProductListPage title={`Danh mục: ${category.ten}`} products={displayProducts} />;
}
