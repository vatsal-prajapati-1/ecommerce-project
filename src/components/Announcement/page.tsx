import { Truck } from "lucide-react";
import AdsBannerSlider from "@/components/AdsBannerSlider/page";

const Announcement = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="free-shipping w-[80%] m-auto py-4 p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md mb-7">
          <div className="col1 flex items-center gap-4">
            <Truck className="text-[50px]" />
            <span className="text-[20px] font-[600] uppercase">
              Free Shipping On All Orders
            </span>
          </div>
          <div className="col2">
            <p className="mb-0 font-[500]">
              Free Delivery Now On Your First Order and over $200
            </p>
          </div>
          <p className="font-bold text-[25px]">- Only $200</p>
        </div>

        <AdsBannerSlider />
      </div>
    </section>
  );
};

export default Announcement;
