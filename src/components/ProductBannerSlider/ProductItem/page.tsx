"use client";
import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating/page";
import React, { useState, useEffect } from "react";

const ProductItem = () => {
  const [disabledRating, setDisabledRating] = useState<number>(2.5);

  useEffect(() => {
    setDisabledRating(2.5);
  }, []);

  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
      <div className="imgWrapper w-[100%] h-[250px] overflow-hidden rounded-md">
        <Image
          src="https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
          alt="Puma shoes"
          width={250}
          height={250}
          className="w-full"
        />
      </div>
      <div className="info p-3 py-5">
        <h6 className="text-[13px]">
          <Link href="/" className="link transition-all">
            Soylent Green
          </Link>
        </h6>
        <h3 className="text-[13px] title mt-1 font-[500] mb-1 text-[rgba(0,0,0,0.9)]">
          <Link href="/" className="link transition-all">
            Siril Georgette Pink Color Saree with Blouse
          </Link>
        </h3>
        <Rating value={2.5} disabled allowHalf />
        <p>Your rating: {disabledRating}</p>

        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            $58.00
          </span>
          <span className="price text-primary text-[15px] font-[600]">
            $58.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
