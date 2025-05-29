"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  ArrowRight,
  ShoppingBag,
  Smartphone,
  Plane,
  Home,
  Car,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const bannerSlides = [
  {
    id: 1,
    title: "Flight Bookings!",
    subtitle: "Up to 20% Off",
    description: "Best ever deals on domestic and international flights",
    code: "FLYFK",
    background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
    textColor: "text-white",
    image: "/images/flight-banner.png",
    icon: <Plane className="h-8 w-8" />,
    badge: "LOWEST FARE",
    category: "Travel",
  },
  {
    id: 2,
    title: "Electronics Sale!",
    subtitle: "Up to 50% Off",
    description: "Latest smartphones, laptops and gadgets at unbeatable prices",
    code: "TECH50",
    background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
    textColor: "text-white",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Smartphone className="h-8 w-8" />,
    badge: "MEGA SALE",
    category: "Electronics",
  },
  {
    id: 3,
    title: "Fashion Fiesta!",
    subtitle: "Up to 70% Off",
    description: "Trendy clothes, shoes and accessories for every occasion",
    code: "STYLE70",
    background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    textColor: "text-white",
    image: "/placeholder.svg?height=400&width=600",
    icon: <ShoppingBag className="h-8 w-8" />,
    badge: "TRENDING",
    category: "Fashion",
  },
  {
    id: 4,
    title: "Home & Living!",
    subtitle: "Up to 40% Off",
    description: "Transform your space with our premium furniture collection",
    code: "HOME40",
    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    textColor: "text-white",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Home className="h-8 w-8" />,
    badge: "NEW ARRIVAL",
    category: "Home & Furniture",
  },
  {
    id: 5,
    title: "Auto & Bikes!",
    subtitle: "Up to 30% Off",
    description: "Best deals on bikes, cars and automotive accessories",
    code: "AUTO30",
    background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    textColor: "text-white",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Car className="h-8 w-8" />,
    badge: "HOT DEALS",
    category: "Automotive",
  },
];

const CarouselSlider = () => {
  return (
    <div className="w-full">
      {/* Navigation Menu */}
      {/* <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="font-bold text-xl text-blue-600">ShopMart</div>
              <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Groceries
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Mobiles
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Fashion
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Electronics
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Home & Furniture
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Appliances
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Flight Bookings
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Beauty & More
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Two Wheelers
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Banner Carousel */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".banner-button-next",
            prevEl: ".banner-button-prev",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="banner-swiper h-80 md:h-96"
        >
          {bannerSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative w-full h-full flex items-center"
                style={{ background: slide.background }}
              >
                <div className="absolute inset-0 bg-black/10"></div>

                {/* Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <div className={`${slide.textColor} space-y-4`}>
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                          {slide.icon}
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30"
                        >
                          {slide.badge}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold">
                          {slide.title}
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-semibold">
                          {slide.subtitle}
                        </h2>
                      </div>

                      <p className="text-lg opacity-90 max-w-md">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="bg-white/90 px-4 py-2 rounded-lg">
                          <span className="text-gray-900 font-bold text-sm">
                            USE CODE: {slide.code}
                          </span>
                        </div>

                        <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                          Shop Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Image Content */}
                    <div className="relative">
                      {slide.id === 1 ? (
                        <Image
                          src="/images/flight-banner.png"
                          alt={slide.title}
                          width={600}
                          height={400}
                          className="w-full h-auto object-contain"
                          priority
                        />
                      ) : (
                        <div className="flex items-center justify-center h-64 bg-white/10 rounded-lg backdrop-blur-sm">
                          <div className="text-center space-y-4">
                            <div className="bg-white/20 p-8 rounded-full mx-auto w-fit">
                              {slide.icon}
                            </div>
                            <p className="text-white/80 text-sm">
                              {slide.category} Image Placeholder
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="banner-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button className="banner-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CarouselSlider;
