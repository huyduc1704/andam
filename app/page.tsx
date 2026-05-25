import MainLayout from "@/components/layout/MainLayout";
import SlideShow from "@/components/layout/SlideShow";
import HomeSections from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <MainLayout>
      {/* Slider ảnh */}
      <SlideShow />

      {/* Các section nội dung: banners, sản phẩm, banner khám phá, đối tác */}
      <HomeSections />
    </MainLayout>
  );
}
