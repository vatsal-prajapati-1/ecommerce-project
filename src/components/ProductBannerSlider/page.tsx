"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductItem from "@/components/ProductBannerSlider/ProductItem/page";

const ProductBannerSlider = () => {
  return (
    <div className="product-banner-slider py-5">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={8}
        navigation
        className="mySwiper"
      >
        <SwiperSlide>
            <ProductItem />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductBannerSlider;
