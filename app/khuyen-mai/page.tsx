import ProductListPage from "@/components/product/ProductListPage";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function KhuyenMaiPage() {
  const { data: productsData } = await supabase
    .from("products")
    .select("*")
    .not("giakm", "is", null)
    .order("id", { ascending: false });

  const products = productsData || [];

  return <ProductListPage title="Sản Phẩm Khuyến Mãi" products={products} />;
}
