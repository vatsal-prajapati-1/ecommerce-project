"use client";
import Link from "next/link";
import Image from "next/image";
import { Carousel, CarouselSlide } from "../ui/carousel";

const products = [
  {
    id: 1,
    name: "Fashion",
    image: "https://serviceapi.spicezgold.com/download/1748409729550_fash.png",
    price: "$299.99",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Electronics",
    image: "https://serviceapi.spicezgold.com/download/1741660988059_ele.png",
    price: "$99.99",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Bags",
    image: "https://serviceapi.spicezgold.com/download/1741661045887_bag.png",
    price: "$199.99",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Footwear",
    image: "https://serviceapi.spicezgold.com/download/1741661061379_foot.png",
    price: "$129.99",
    category: "Electronics",
  },
  {
    id: 5,
    name: "Groceries",
    image: "https://serviceapi.spicezgold.com/download/1741661077633_gro.png",
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
    image: "https://serviceapi.spicezgold.com/download/1741661105893_well.png",
    price: "$499.99",
    category: "Electronics",
  },
  {
    id: 8,
    name: "Jewellery",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6kxp8JR1Syq_16ZV8ger19z-3AOTTydmEiA&s",
    price: "$399.99",
    category: "Electronics",
  },
];

const ProductSlider = () => {
  return (
    <div className="product-slider py-8 pt-8">
      <div className="container">
        <Carousel
          spaceBetween={30}
          slidesPerView={8}
          navigation={true}
          className="mySwiper"
          pagination={true}
        >
          {products.map((product, index) => (
            <CarouselSlide key={index}>
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
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductSlider;
