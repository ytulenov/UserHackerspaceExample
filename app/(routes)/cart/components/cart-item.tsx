"use client";

/*
import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product, Productvalue } from "@/types";

type CartItem = Product & {
  selectedColor: string | null;
  selectedMasterType: string | null; 
  selectedChildrenType: string | null;
  selectedThirdType: string | null;
  selectedQuantity: string | null;
};

interface CartItemProps {
  data: Product | CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  console.log("Props received in CartItem:", {
    data,
  });

  const cartItemData = data as CartItem;

  const getColorName = (item: Product | CartItem): string | null => {
    // Check if it's a CartItem with selectedColor
    if ("selectedColor" in item && item.selectedColor !== null) {
      const matchingValue = item.values?.find(
        (value) => value.color.value === item.selectedColor
      );

      return matchingValue ? matchingValue.color.name || null : null;
    }

    // Check if it's a Product with values
    if ("values" in item && item.values.length > 0) {
      // You might want to handle this case differently if needed
      return item.values[0].color.name || null;
    }

    return null;
  };

  const onRemove = () => {
    cart.removeItem(cartItemData.id);
  };

  const price = (): string => {
    const selectedProductValue = data?.values.find(
      (productValue) =>
        productValue.color.value === cartItemData.selectedColor &&
        productValue.typevaluemaster === cartItemData.selectedMasterType &&
        productValue.typevaluechildren === cartItemData.selectedChildrenType
    );

    return selectedProductValue ? String(selectedProductValue.price) : "0";
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.values[0]./*values.*/ /*images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{data.name}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{getColorName(data) || "n/a"}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>
          </div>
          {data.mode === "2" && (
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">
                Master Type: {cartItemData.selectedMasterType || "n/a"}
              </p>
            </div>
          )}
          {data.mode === "3" && (
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">
                Master Type: {cartItemData.selectedMasterType || "n/a"}
              </p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                Children Type: {cartItemData.selectedChildrenType || "n/a"}
              </p>
            </div>
          )}
          {data.mode === "4" && (
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">
                Master Type: {cartItemData.selectedChildrenType || "n/a"}
              </p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                Children Type: {cartItemData.selectedChildrenType || "n/a"}
              </p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                Third Type: {cartItemData.selectedThirdType || "n/a"}
              </p>
            </div>
          )}
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">
              Quantity: {cartItemData.selectedQuantity || "n/a"}
            </p>
          </div>
          <Currency value={price()} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
*/

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product, Productvalue } from "@/types";

type CartItem = Product & {
  /*selectedColor: string | null;
  selectedMasterType: string;
  selectedChildrenType: string;
  selectedThirdType: string;
  selectedQuantity: string | null;*/
  productValueId: string; 
  productIndex: number;
  productQuantity: number;
  productPrice: number;
};

interface CartItemProps {
  data: Product | CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  console.log("Props received in CartItem:", {
    data,
  });

  const cartItemData = data as CartItem;

  const getColorName = (item: Product | CartItem): string | null => {
    // Check if it's a CartItem with selectedColor
    if ("selectedColor" in item && item.selectedColor !== null) {
      const matchingValue = item.values?.find(
        (value) => value.color.value === item.selectedColor
      );

      return matchingValue ? matchingValue.color.name || null : null;
    }

    // Check if it's a Product with values
    if ("values" in item && item.values.length > 0) {
      // You might want to handle this case differently if needed
      return item.values[0].color.name || null;
    }

    return null;
  };

  const onRemove = () => {
    cart.removeItem(cartItemData.productValueId);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data?.values.find((productValue) =>productValue.index === cartItemData.productIndex)?.images[0]?.url || ""}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{data.name}</p>
          </div>

          <div className="mt-1 flex text-sm">
          
          
            
            <p className="text-gray-500">{data?.values.find((productValue) =>productValue.index === cartItemData.productIndex)?.color.name || "n/a"}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>
          </div>
          {data.mode === "2" && (
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">
                Master Type: {data?.values.find((productValue) =>productValue.index === cartItemData.productIndex)?.typevaluemaster || "n/a"}
              </p>
            </div>
          )}
          {data.mode === "3" && (
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">
                Master Type: {data?.values.find((productValue) =>productValue.index === cartItemData.productIndex)?.typevaluemaster || "n/a"}
              </p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                Children Type: {data?.values.find((productValue) =>productValue.index === cartItemData.productIndex)?.typevaluechildren || "n/a"}
              </p>
            </div>
          )}
          {data.mode === "4" && (
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">
                Master Type: {data?.values.find((productValue) =>productValue.index === cartItemData.productIndex)?.typevaluemaster || "n/a"}
              </p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                Children Type: {data?.values.find((productValue) =>productValue.index === cartItemData.productIndex)?.typevaluechildren || "n/a"}
              </p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                Third Type: {data?.values.find((productValue) =>productValue.index === cartItemData.productIndex)?.typevaluethird || "n/a"}
                
              </p>
            </div>
          )}
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">
              Quantity: {cartItemData.productQuantity || "n/a"}
            </p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">
              Index: {cartItemData.productIndex || "n/a"}
            </p>
          </div>
          <Currency value={data?.values.find((productValue) =>productValue.index === cartItemData.productIndex)?.price} />
        
        </div>
      </div>
    </li>
  );
};

export default CartItem;


/*<p className="text-gray-500">{getColorName(data) || "n/a"}<p>*/