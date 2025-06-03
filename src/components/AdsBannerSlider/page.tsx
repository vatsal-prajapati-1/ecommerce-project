"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    id: 1,
    name: "Summer Sale",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "New Collection",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Special Offers",
    image:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Holiday Deals",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Flash Sale",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "Clearance",
    image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 7,
    name: "Black Friday",
    image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    name: "Cyber Monday",
    image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    name: "Cyber Monday",
    image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    name: "Cyber Monday",
    image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&auto=format&fit=crop&q=60",
  },
];

const AdsBannerSlider = () => {
  return (
    <div className="py-5 w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        className="banner-slider"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} className="box">
            <Link href={`/banner/${banner.id}`}>
              <div className="box bannerbox overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
                <Image
                  src={banner.image}
                  alt={banner.name}
                  height={300}
                  width={400}
                  className="w-full h-[200px] object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
