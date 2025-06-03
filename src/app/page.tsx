import Announcement from "@/components/Announcement/page";
import BannerProduct from "@/components/BannerProduct/page";
import CarouselSlider from "@/components/CarouselSlider/page";
import ProductSlider from "@/components/ProductSlider/page";

const page = () => {
  return (
    <div>
      <CarouselSlider />
      <ProductSlider />
      <BannerProduct />
      <Announcement />
    </div>
  );
};

export default page;
