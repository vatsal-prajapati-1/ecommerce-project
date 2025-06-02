"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Smart Tablet",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMl3kMXE4jgnoWxjrcmusaydVKsxuDUt8gaw&s",
    price: "$299.99",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMl3kMXE4jgnoWxjrcmusaydVKsxuDUt8gaw&s",
    price: "$99.99",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Smart Watch",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMl3kMXE4jgnoWxjrcmusaydVKsxuDUt8gaw&s",
    price: "$199.99",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Smart Watch",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMl3kMXE4jgnoWxjrcmusaydVKsxuDUt8gaw&s",
    price: "$199.99",
    category: "Electronics",
  },
];

const ProductSlider = () => {
  return (
    <div className="product-slider">
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={8}
          navigation
          className="mySwiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <Link href={`/product/${product.id}`}>
                <div className="item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                  <Image
                    src={product.image}
                    alt={product.name}
                    height={100}
                    width={100}
                    className="w-[60px] transition-all"
                  />
                  <h3 className="text-[15px] font-[500] mt-3">
                    {product.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
