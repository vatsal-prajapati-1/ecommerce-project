import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <header>
      <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px]">
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
      <div className="header">
        <div className="container flex items-center justify-between">
          <div className="col1">
            <Link href="/">
            <Image src="/logo" alt="shopping logo" />
            </Link>
          </div>
          <div className="col2">
          
          </div>
          <div className="col3">

          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;
