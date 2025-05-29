import Link from "next/link";

interface DropdownMenuProps {
  items: {
    title: string;
    href: string;
  }[];
}

const DropdownMenu = ({ items }: DropdownMenuProps) => {
  return (
    <div className="absolute top-full left-0 bg-[#f5f0f0] shadow-lg rounded-md py-2 min-w-[200px] z-50 hidden group-hover:block">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="block px-4 py-2 hover:bg-gray-200 transition-colors"
        >
          <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)] hover:text-[#ff5252]">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default DropdownMenu;
