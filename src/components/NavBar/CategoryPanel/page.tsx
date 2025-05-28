import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

const CategoryPanel = () => {
  const categories = [
    "Fashion",
    "Electronics",
    "Bags",
    "Footwear",
    "Groceries",
    "Beauty",
    "Wellness",
    "Jewellery",
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="!text-black gap-2 w-full shadow-none hover:bg-gray-100 transition-colors duration-200">
          <AlignLeft className="text-[18px]" /> Shop By Categories
          <ChevronDown className="text-[13px] ml-auto font-bold" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 bg-white">
        <SheetHeader className="p-6 border-b bg-gray-50">
          <SheetTitle className="text-2xl font-bold text-gray-800">
            Shop by Categories
          </SheetTitle>
        </SheetHeader>
        <div className="p-6">
          <div className="space-y-1">
            {categories.map((category) => (
              <Link href={`/category/${category.toLowerCase()}`} key={category}>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-lg hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <span className="text-gray-700 group-hover:text-[#ff5252] transition-colors duration-200">
                    {category}
                  </span>
                  <ChevronRight className="text-gray-400 group-hover:text-[#ff5252] transition-colors duration-200" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryPanel;
