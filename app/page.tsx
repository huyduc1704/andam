import MainLayout from "@/components/layout/MainLayout";
import SlideShow from "@/components/layout/SlideShow";
import HomeSections from "@/components/home/HomeSections";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Disable static caching for this page

export default async function HomePage() {
  // Fetch categories
  const { data: categoriesData } = await supabase.from("categories").select("*").order("id", { ascending: true });
  
  // Fetch products
  const { data: productsData } = await supabase.from("products").select("*").order("id", { ascending: false });

  // Fetch slides
  const { data: slidesData } = await supabase.from("slides").select("*").eq("active", true).order("id", { ascending: false });

  // Map products into their respective categories
  const categoriesWithProducts = (categoriesData || []).map((cat) => {
    return {
      ...cat,
      products: (productsData || []).filter((p) => p.category_slug === cat.slug).slice(0, 10), // Limit to 10 per category on homepage
    };
  });

  return (
    <MainLayout>
      {/* Slider ảnh */}
      <SlideShow slides={slidesData || undefined} />

      {/* Các section nội dung: banners, sản phẩm, banner khám phá, đối tác */}
      <HomeSections categories={categoriesWithProducts} />
    </MainLayout>
  );
}
