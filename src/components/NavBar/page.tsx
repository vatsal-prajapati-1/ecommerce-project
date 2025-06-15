import { Rocket } from "lucide-react";
import Button from "@/components/ui/button";
import Link from "next/link";
import CategoryPanel from "@/components/NavBar/CategoryPanel/page";
import DropdownMenu from "./DropdownMenu/page";

const NavBar = () => {
  const fashionItems = [
    { title: "Men's Fashion", href: "/fashion/men" },
    { title: "Women's Fashion", href: "/fashion/women" },
    { title: "Kids' Fashion", href: "/fashion/kids" },
    { title: "Accessories", href: "/fashion/accessories" },
  ];

  const electronicsItems = [
    { title: "Smartphones", href: "/electronics/smartphones" },
    { title: "Laptops", href: "/electronics/laptops" },
    { title: "Gaming", href: "/electronics/gaming" },
    { title: "Audio", href: "/electronics/audio" },
    { title: "Wearables", href: "/electronics/wearables" },
  ];

  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-end gap-8">
          <div className="col_1 w-[20%]">
            <CategoryPanel />
          </div>
          <div className="col_2 w-[60%]">
            <ul className="flex items-center gap-2">
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] capitalize shadow-none">
                    Home
                  </Button>
                </Link>
              </li>
              <li className="list-none relative group">
                <Link
                  href="/fashion"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] capitalize shadow-none">
                    Fashion
                  </Button>
                </Link>
                <DropdownMenu items={fashionItems} />
              </li>

              <li className="list-none relative group">
                <Link
                  href="/electronics"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] capitalize shadow-none">
                    Electronics
                  </Button>
                </Link>
                <DropdownMenu items={electronicsItems} />
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] capitalize shadow-none">
                    Bags
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] capitalize shadow-none">
                    Footwear
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] capitalize shadow-none">
                    Groceries
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] capitalize shadow-none">
                    Beauty
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] capitalize shadow-none">
                    Wellness
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] capitalize shadow-none">
                    Jewellery
                  </Button>
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
    </>
  );
};

export default NavBar;
