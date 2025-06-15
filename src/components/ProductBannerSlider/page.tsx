"use client";
import ProductItem from "@/components/ProductBannerSlider/ProductItem/page";
import { Carousel, CarouselSlide } from "@/components/ui/carousel";
import React from "react";

const ProductBannerSlider = () => {
  return (
    <div className="product-banner-slider py-4">
      <Carousel
        spaceBetween={30}
        slidesPerView={8}
        navigation={true}
        className="mySwiper"
        pagination={true}
      >
        <CarouselSlide>
          <ProductItem />
        </CarouselSlide>
        <CarouselSlide>
          <ProductItem />
        </CarouselSlide>
        <CarouselSlide>
          <ProductItem />
        </CarouselSlide>
      </Carousel>
    </div>
  );
};

export default ProductBannerSlider;
