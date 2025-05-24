import { AlignLeft, ChevronDown, Rocket } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import CategoryPanel from "@/components/NavBar/CategoryPanel/page";

const NavBar = () => {
  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-end gap-8">
          <div className="col_1 w-[20%]">
            <Button className="!text-black gap-2 w-full">
              {" "}
              <AlignLeft className="text-[18px]" /> Shop By Categories
              <ChevronDown className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>
          <div className="col_2 w-[60%]">
            <ul className="flex items-center gap-3">
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.7)] hover:!text-[#000000]">
                    Home
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  Fashion
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  Electronics
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  Bags
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  Footwear
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  Groceries
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  Beauty
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  Wellness
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  Jewellery
                </Link>
              </li>
            </ul>
          </div>
          <div className="col_3 w-[20%]">
            <p className="text-[13px] font-[500] flex items-center gap-3 mt-0 mb-0">
              <Rocket className="text-[18px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* {category pannel components} */}
      <CategoryPanel />
    </>
  );
};

export default NavBar;
