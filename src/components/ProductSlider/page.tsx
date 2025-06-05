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
    name: "Fashion",
    image:
      "https://serviceapi.spicezgold.com/download/1748409729550_fash.png",
    price: "$299.99",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Electronics",
    image:
      "https://serviceapi.spicezgold.com/download/1741660988059_ele.png",
    price: "$99.99",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Bags",
    image:
      "https://serviceapi.spicezgold.com/download/1741661045887_bag.png",
    price: "$199.99",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Footwear",
    image:
      "https://serviceapi.spicezgold.com/download/1741661061379_foot.png",
    price: "$129.99",
    category: "Electronics",
  },
  {
    id: 5,
    name: "Groceries",
    image:
      "https://serviceapi.spicezgold.com/download/1741661077633_gro.png",
    price: "$79.99",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Beauty",
    image:
      "https://serviceapi.spicezgold.com/download/1741661092792_beauty.png",
    price: "$999.99",
    category: "Electronics",
  },
  {
    id: 7,
    name: "Wellness",
    image:
      "https://serviceapi.spicezgold.com/download/1741661105893_well.png",
    price: "$499.99",
    category: "Electronics",
  },
  {
    id: 8,
    name: "Jewellery",
    image:
      "https://serviceapi.spicezgold.com/download/1749118107671_Screenshot2024-05-19221016.png",
    price: "$399.99",
    category: "Electronics",
  },
];

const ProductSlider = () => {
  return (
    <div className="product-slider py-8 pt-8">
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
