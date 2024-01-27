import { Product } from "@/types";
import qs from "query-string";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/products`; 

interface Query {
  categoryId?: string;
  sizeId?: string;                  
  isFeatured?: boolean; 
  colorId?: string;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: { 
      sizeId: query.sizeId, 
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      colorId: query.colorId,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;