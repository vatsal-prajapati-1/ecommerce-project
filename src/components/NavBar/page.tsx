import { AlignLeft } from "lucide-react";
import { Button } from "../ui/button";

const NavBar = () => {
  return (
    <nav className="py-2">
      <div className="container flex items-center justify-end">
        <div className="col_1 w-[30%]">
          <Button className="!text-black gap-2">
            {" "}
            <AlignLeft className="text-[18px]" /> Shop By Categories
          </Button>
        </div>
        <div className="col_2 w-[70%]"></div>
      </div>
    </nav>
  );
};

export default NavBar;
