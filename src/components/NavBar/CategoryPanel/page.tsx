"use client";
import Button from "@/components/ui/button";
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
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="!text-black gap-2 w-full shadow-none transition-colors duration-200">
          <AlignLeft className="text-[18px]" />
          Shop By Categories
          <ChevronDown className="text-[13px] ml-auto" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[350px] sm:w-[420px] bg-[#f5f0f0] p-0"
      >
        <SheetHeader className="p-5 border-b border-gray-300 bg-[#f5f0f0]">
          <SheetTitle className="text-[16px] font-semibold text-gray-800">
            Shop by Categories
          </SheetTitle>
        </SheetHeader>

        <div className="px-5 py-4">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/category/${category.name.toLowerCase()}`}
                    className="flex-grow"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-[15px] font-medium text-gray-800 hover:text-[#ff5252] transition-colors shadow-none capitalize"
                    >
                      {category.name}
                    </Button>
                  </Link>
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="p-1 focus:outline-none"
                  >
                    {expandedCategory === category.name ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>

                {expandedCategory === category.name && (
                  <div className="mt-2 ml-4 space-y-2">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`/category/${category.name.toLowerCase()}/${sub
                          .toLowerCase()
                          .replace(/'/g, "")
                          .replace(/\s+/g, "-")}`}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-[14px] text-gray-700 hover:text-[#ff5252] capitalize shadow-none"
                        >
                          {sub}
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
