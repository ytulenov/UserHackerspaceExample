import { OrderItem } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

interface Query {
  orderId?: string;
  product:{
    id: string;
    name: string;
    price: string;
  }
}

const getOrderInfo = async (query: Query): Promise<OrderItem> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      orderId: query.orderId,
      id: query.product.id,
      name: query.product.name,
      price: query.product.price
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getOrderInfo;
