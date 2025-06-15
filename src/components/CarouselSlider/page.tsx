"use client";
import Image from "next/image";
import { Carousel, CarouselSlide } from "@/components/ui/carousel";

const images = [
  "https://serviceapi.spicezgold.com/download/1745503990603_NewProject(13).jpg",
  "https://serviceapi.spicezgold.com/download/1741660881858_NewProject(11).jpg",
  "https://serviceapi.spicezgold.com/download/1741660862304_NewProject(8).jpg",
];

const CarouselSlider = () => {
  return (
    <div className="py-4">
      <div className="container">
        <Carousel
          spaceBetween={10}
          slidesPerView={1}
          navigation={true}
          pagination={true}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="slider-home"
        >
          {images.map((src, index) => (
            <CarouselSlide key={index}>
              <div className="item rounded-[20px] overflow-hidden">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  width={1200}
                  height={600}
                  quality={100}
                  priority={index === 0}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    maxHeight: "600px",
                  }}
                />
              </div>
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSlider;
