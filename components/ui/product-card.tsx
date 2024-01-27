"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
 
import { useEffect, useState } from "react"; 

interface CartItem extends Product {
  productValueId: string | null; 
  productIndex: number | null;
  productQuantity: number | null;
  productPrice: number | null;
}

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    const cartItem: CartItem = {
      ...data,
      productValueId: null, 
      productIndex: null,
      productQuantity: null,
      productPrice: null,
    };

    cart.addItem(cartItem);
  };

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // Effect to update the price range when data changes
  useEffect(() => {
    if (data && data.values && data.values.length > 0) {
      // Extract prices from product values and convert them to numbers
      const prices = data.values.map((value) =>
        parseFloat(value.price.toString())
      );

      // Check if prices are valid numbers
      if (prices.every((price) => !isNaN(price))) {
        // Calculate the minimum and maximum prices
        const calculatedMinPrice = Math.min(...prices);
        const calculatedMaxPrice = Math.max(...prices);

        // Set the state variables
        setMinPrice(calculatedMinPrice);
        setMaxPrice(calculatedMaxPrice);
      }
    }
  }, [data]);

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.values[0].images?.[0]?.url}
          fill
          alt="Image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            {/*<IconButton 
                            onClick = {onAddToCart}
                            icon = {<ShoppingCart size={20} className="text-gray-600"/>}
    />*/}
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price */}
      {maxPrice > minPrice && (
        <div className="felx items-center justify-between font-semibold">
          ${minPrice} - ${maxPrice}
        </div>
      )}
      {maxPrice === minPrice && (
        <div className="felx items-center justify-between font-semibold">
          ${minPrice}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
