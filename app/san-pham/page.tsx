import ProductListPage from "@/components/product/ProductListPage";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function AllProductsPage() {
  const { data: productsData } = await supabase.from("products").select("*").order("id", { ascending: false });
  const products = productsData || [];

  return <ProductListPage title="Tất cả Sản phẩm" products={products} />;
}
