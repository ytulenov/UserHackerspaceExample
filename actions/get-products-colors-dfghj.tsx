import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  values?:
    {colorId?: string;}
}

const getProductsColors = async (query: Query): Promise<Product[]> => {
  // Check if categoryId is provided, as colorId should be filtered based on category
  

  // Fetch the products associated with the specified categoryId
  const categoryProductsUrl = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
    },
  });

  const categoryProductsRes = await fetch(categoryProductsUrl);

  // Ensure categoryProductsRes is okay before proceeding
  if (!categoryProductsRes.ok) {
    throw new Error(`Failed to fetch products: ${categoryProductsRes.statusText}`);
  }

  const categoryProducts: Product[] = await categoryProductsRes.json();

  // Check if colorId is provided and is a valid color within the category
  if (query.values.colorId) {
    const isValidColorId = categoryProducts.some(product =>
      product.values.some(value => value.color && value.color.id === query.values.colorId)
    );

    if (!isValidColorId) {
      throw new Error("Invalid colorId specified for the category");
    }
  }

  // Construct the final URL with the query parameters
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      values:{
          colorId: query.colorId,}
    },
  });

  // Fetch products based on the final URL
  const res = await fetch(url);

  // Ensure res is okay before proceeding
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  return res.json();
};

export default getProductsColors;
