
import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { Product } from "@/types";
import { OrderItem } from "@/types";
import {
  Table,
  TableBody, 
  TableCaption,
  TableCell, 
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PurchasedItemProps {
  orderItems: OrderItem[];
  totalPrices: number
}

export const PurchasedItem: React.FC<PurchasedItemProps> = async ({
  orderItems,
  totalPrices
}) => {
  const totalPrice = totalPrices
  return (
    
    <ul className="grid grid-cols-1 gap-y-4">
      {/* Table Header */}
      <li className="border-t border-b py-2 flex items-center font-bold justify-end">
        <div className="grid grid-cols-6 gap-x-4 w-full">
          <div className="col-span-1 text-center">Order Summary:</div>
          <div className="col-span-1 text-center">Name</div>
          <div className="col-span-1 text-center">Size</div>
          <div className="col-span-1 text-center">Color</div>
          <div className="col-span-1 text-center">Quantity</div>
          <div className="col-span-1 text-right">Price</div>
        </div>
      </li>

      {/* Table Content */}
      {orderItems.map((orderItem) => (
        <li key={orderItem.id} className="border-b py-2 pb-6 flex items-center">
          {/* Render information from orderItem as needed */}
          {orderItem.product ? (
            <div className="grid grid-cols-6 gap-x-4 w-full">
              {/* Product Images */}
             
              
              {orderItem.productvalue.images.length > 0 ? (
                <div className="col-span-1 flex items-center justify-center">
                  <ul>
                        <Image
                          src={orderItem.productvalue.images[0].url}
                          alt={`${orderItem.product.name} Image`}
                          width={300}
                          height={300}
                        />
                  </ul>
                </div>
              ) : (
                <span className="col-span-1 flex items-center justify-center">
                  No images available
                </span>
              )}

              {/* Product Name */}
              <div className="col-span-1 flex flex-col items-center justify-center">
                <span className="text-xl">{orderItem.product.name}</span>
                {orderItem.product.mode === '2' && (
                  <>
                    <span  className="font-light text-xs">{orderItem.product.mastertype}: {orderItem.productvalue.typevaluemaster}</span>
                  </>
                )}
                {orderItem.product.mode === '3' && (
                  <>
                    <span  className="font-light text-xs">{orderItem.product.mastertype}: {orderItem.productvalue.typevaluemaster}</span>
                    <span className="font-light text-xs" >{orderItem.product.childrentype}: {orderItem.productvalue.typevaluechildren}</span>
                  </>
                )}
                {orderItem.product.mode === '4' && (
                  <>
                    <span  className="font-light text-xs">{orderItem.product.mastertype}: {orderItem.productvalue.typevaluemaster}</span>
                    <span className="font-light text-xs" >{orderItem.product.childrentype}: {orderItem.productvalue.typevaluechildren}</span>
                    <span className="font-light text-xs">{orderItem.product.thirdtype}: {orderItem.productvalue.typevaluethird}</span>
                  </>
                )}
              </div>

              {/* Product Size */}
              <div className="col-span-1 flex flex-col items-center justify-center">
                <span>{orderItem.product.size.name}</span>
                <span>{orderItem.product.size.value}</span>
              </div>

              {/* Product Color */}
              <div className="col-span-1 flex flex-col items-center justify-center">
                <div
                  className="h-6 w-6 rounded-full border"
                  style={{
                  backgroundColor: orderItem.productvalue.color.value,
                  }}
                />
                {/*orderItem.productvalue.color.value*/}
                <span>{orderItem.productvalue.color.name}</span>
              </div>

              {/* Product Quantity */}
              <div className="col-span-1 flex flex-col items-center justify-center">
                <span>{orderItem.quantity}</span>
              </div>

              {/* Product Price */}
              <div className="col-span-1 flex items-center justify-end">
                <Currency value={orderItem.productvalue.price*orderItem.quantity} />
                </div>
            </div>
          ) : (
            <span className="w-full">No product information available</span>
          )}
        </li>
      ))}
      {/* Table Footer - Total Price */}
      <li className="border-t py-2 flex items-center justify-end font-bold">
        <div className="grid grid-cols-6 gap-x-4 w-full">
          <div className="col-span-6 text-right">
            <span className="inline">Total Price: </span>
            <div style={{ display: "inline-block" }}>
              <Currency value={totalPrice.toString()} />
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default PurchasedItem;
