"use client";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselSlide } from "../ui/carousel";

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
];

const AdsBannerSlider = () => {
  return (
    <div className="py-5 w-full">
      <Carousel
        spaceBetween={10}
        slidesPerView={4}
        navigation={true}
        pagination={true}
        className="banner-slider"
      >
        {banners.map((banner, index) => (
          <CarouselSlide key={index} className="box">
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
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default AdsBannerSlider;
