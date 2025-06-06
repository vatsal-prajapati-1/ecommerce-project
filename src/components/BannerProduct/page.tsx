"use client";
import ScrollableTabs from "@/components/ScrollableTab/page";
import ProductBannerSlider from "@/components/ProductBannerSlider/page";

const BannerProduct = () => {
  return (
    <section className="bg-white py-8">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="leftSec">
            <h2 className="text-[20px] font-[600]">Popular Products</h2>
            <p className="text-[14px] font-[400]">
              Do not miss the current offers until the end of March.
            </p>
          </div>
          <div className="rightSec w-[60%]">
            <ScrollableTabs />
          </div>
        </div>

        <ProductBannerSlider />
      </div>
    </section>
  );
};

export default BannerProduct;
