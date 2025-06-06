import Image from "next/image";

const ProductItem = () => {
  return (
    <div className="product-item w-[100%] h-[250px] overflow-hidden">
      <div className="image-wrapper w-[100%] h-[250px] overflow-hidden rounded-md">
        <Image
          src="https://rukminim2.flixcart.com/image/240/240/xif0q/shoe/j/9/o/-original-imah4qrfhtfbdj4h.jpeg?q=60"
          alt="Puma shoes"
          width={250}
          height={250}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default ProductItem;
