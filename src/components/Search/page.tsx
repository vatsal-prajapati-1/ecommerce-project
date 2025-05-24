import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
      />
      <Button className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black bg-inherit hover:bg-inherit">
        <SearchIcon className="text-[#4e4e4e] text-[22px]" />
      </Button>
    </div>
  );
};

export default Search;
