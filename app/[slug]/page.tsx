import ProductListPage from "@/components/product/ProductListPage";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 0; // Disable static caching

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // Find category in Supabase
  const { data: categoryData } = await supabase.from("categories").select("*").eq("slug", slug).single();
  
  if (!categoryData) {
    notFound(); // Not a category, let Next.js show 404 or handle other routes
  }

  // Lọc sản phẩm theo danh mục từ Supabase
  const { data: productsData } = await supabase.from("products").select("*").eq("category_slug", slug).order("id", { ascending: false });
  const products = productsData || [];

  return <ProductListPage title={`Danh mục: ${categoryData.ten}`} products={products} />;
}
