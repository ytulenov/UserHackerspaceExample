import { OrderItem, Productvalue } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/productvalue`;

const getProductValue = async (selectedMasterType: string,
  selectedChildrenType: string,
  selectedThirdType: string ): Promise<Productvalue> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
        typevaluemaster: selectedMasterType,
        typevaluechildren: selectedChildrenType,
        typevaluethird: selectedThirdType,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProductValue;
