"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CategoryPanel = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = [
    {
      name: "Fashion",
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Kids' Fashion",
        "Accessories",
      ],
    },
    {
      name: "Electronics",
      subcategories: ["Smartphones", "Laptops", "Tablets", "Audio Devices"],
    },
    {
      name: "Bags",
      subcategories: ["Backpacks", "Handbags", "Travel Bags", "Wallets"],
    },
    {
      name: "Footwear",
      subcategories: [
        "Sports Shoes",
        "Casual Shoes",
        "Formal Shoes",
        "Sandals",
      ],
    },
    {
      name: "Groceries",
      subcategories: ["Fresh Produce", "Dairy Products", "Beverages", "Snacks"],
    },
    {
      name: "Beauty",
      subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances"],
    },
    {
      name: "Wellness",
      subcategories: ["Vitamins", "Supplements", "Fitness", "Yoga"],
    },
    {
      name: "Jewellery",
      subcategories: ["Necklaces", "Earrings", "Bracelets", "Rings"],
    },
  ];

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="!text-black gap-2 w-full shadow-none transition-colors duration-200">
          <AlignLeft className="text-[18px]" /> Shop By Categories
          <ChevronDown className="text-[13px] ml-auto font-bold" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[400px] sm:w-[540px] p-0 bg-[#f5f0f0]"
      >
        <SheetHeader className="p-6 border-t-[1px] border-b-[1px] border-gray-250 bg-[#f5f0f0]">
          <SheetTitle className="text-[15px] font-[500] text-gray-800">
            Shop by Categories
          </SheetTitle>
        </SheetHeader>
        <div className="p-6 bg-[#f5f0f0]">
          <div className="space-y-1">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/category/${category.name.toLowerCase()}`}
                    className="flex-grow"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-[14px] !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] transition-colors duration-200 group capitalize shadow-none"
                    >
                      <span className="!text-[rgba(0,0,0,0.8)] group-hover:!text-[#ff5252] !font-[500] text-[14px] capitalize transition-colors duration-200">
                        {category.name}
                      </span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleCategory(category.name)}
                  >
                    {expandedCategory === category.name ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
                {expandedCategory === category.name && (
                  <div className="pl-6 py-2 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        href={`/category/${category.name.toLowerCase()}/${subcategory
                          .toLowerCase()
                          .replace(/'/g, "")}`}
                        key={subcategory}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-[14px] !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] transition-colors duration-200 group capitalize shadow-none"
                        >
                          <span className="!text-[rgba(0,0,0,0.8)] group-hover:!text-[#ff5252] !font-[500] text-[14px] capitalize transition-colors duration-200">
                            {subcategory}
                          </span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryPanel;
