"use client";
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/Search/page";
import NavBar from "@/components/NavBar/page";
import IconWithBadge from "@/components/IconWithBadge/page";
import { Repeat, Heart, ShoppingCart } from "lucide-react";

const Banner = () => {
  return (
    <header>
      <div className="py-2 border-t-[1px] border-b-[1px] border-gray-250">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1-[50%]">
              <p className="text-[12px] font-[500]">
                Get up to 50% off new season style, limited time only
              </p>
            </div>

            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-3">
                <li className="list-none">
                  <Link
                    href="/help-center"
                    className="text-[13px] link font-[500] transition"
                  >
                    Help Center{" "}
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    href="/order-tracking"
                    className="text-[13px] link font-[500] transition"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header py-4 border-b-[1px] border-gray-250">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[25%]">
            <Link href="/">
              <Image src="/logo.png" alt="ILYAHIKA" width={150} height={50} />
            </Link>
          </div>
          <div className="col2 w-[45%]">
            <Search />
          </div>
          <div className="col3 w-[30%] flex items-center pl-7">
            <ul className="flex items-center gap-3 w-full">
              <li className="list-none">
                <Link
                  href="/login"
                  className="link transition text-[15px] font-[500]"
                >
                  Login
                </Link>{" "}
                | &nbsp;
                <Link
                  href="/register"
                  className="link transition text-[15px] font-[500]"
                >
                  Register
                </Link>
              </li>
              <li>
                <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
                  <IconWithBadge icon={<Repeat size={30} />} count={0} />
                  <IconWithBadge icon={<Heart size={30} />} count={0} />
                  <IconWithBadge icon={<ShoppingCart size={30} />} count={1} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <NavBar />
    </header>
  );
};

export default Banner;
