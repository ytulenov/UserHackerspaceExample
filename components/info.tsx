"use client";

import { ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { Product, Productvalue, Image as ImageType } from "@/types";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  /*const onAddToCart = () => {
    const selectedItems = {
      ...data,
      selectedColor,
      selectedMasterType,
      selectedChildrenType,
      selectedThirdType,
      selectedQuantity,
    };
    console.log("Selected Items: ", selectedItems);
    cart.addItem(selectedItems);
  };*/
  const onAddToCart = () => {
    let selectedItems;

  switch (data.mode) {
    case "1":
      // Handle mode 1 logic
      // For example, find the index based on selectedColor
      selectedItems = {
        ...data,
        productValueId: data?.values[0].id,
        productIndex: 1,
        productPrice: data?.values[0].price,
        productQuantity: selectedQuantity,
      };
      break;

    case "2":
      // Handle mode 2 logic
      // For example, find the index based on selectedColor and selectedMasterType
      selectedItems = {
        ...data,
        productValueId: data?.values.find(
          (productValue) =>
            productValue.color.value === selectedColor &&
            productValue.typevaluemaster === selectedMasterType
        )?.id,
        productIndex: data?.values.find(
          (productValue) =>
            productValue.color.value === selectedColor &&
            productValue.typevaluemaster === selectedMasterType
        )?.index,
        productPrice: data?.values.find(
          (productValue) =>
            productValue.color.value === selectedColor &&
            productValue.typevaluemaster === selectedMasterType
        )?.price,
        productQuantity: selectedQuantity,
      };
      break;

    case "3":
      // Handle mode 3 logic
      // For example, find the index based on selectedColor, selectedMasterType, and selectedChildrenType
      selectedItems = {
        ...data,
        productValueId: data?.values.find(
          (productValue) =>
            productValue.color.value === selectedColor &&
            productValue.typevaluemaster === selectedMasterType &&
            productValue.typevaluechildren === selectedChildrenType
        )?.id,
        productIndex: data?.values.find(
          (productValue) =>
            productValue.color.value === selectedColor &&
            productValue.typevaluemaster === selectedMasterType &&
            productValue.typevaluechildren === selectedChildrenType
        )?.index,
        productPrice: data?.values.find(
          (productValue) =>
            productValue.color.value === selectedColor &&
            productValue.typevaluemaster === selectedMasterType &&
            productValue.typevaluechildren === selectedChildrenType
        )?.price, 
        productQuantity: selectedQuantity,
      };
      break;

    case "4":
      // Handle mode 4 logic
      // For example, find the index based on selectedColor, selectedMasterType, selectedChildrenType, and selectedThirdType
      selectedItems = {
        ...data,
        productValueId: data?.values.find(
          (productValue) =>
            productValue.color.value === selectedColor &&
            productValue.typevaluemaster === selectedMasterType &&
            productValue.typevaluechildren === selectedChildrenType &&
            productValue.typevaluethird === selectedThirdType
        )?.id,
        productIndex: data?.values.find(
          (productValue) =>
            productValue.color.value === selectedColor &&
            productValue.typevaluemaster === selectedMasterType &&
            productValue.typevaluechildren === selectedChildrenType &&
            productValue.typevaluethird === selectedThirdType
        )?.index,
        productPrice: data?.values.find(
          (productValue) =>
            productValue.color.value === selectedColor &&
            productValue.typevaluemaster === selectedMasterType &&
            productValue.typevaluechildren === selectedChildrenType &&
            productValue.typevaluethird === selectedThirdType
        )?.price,
        productQuantity: selectedQuantity,
      };
      break;

    default:
      break;
  }

  if (selectedItems) {
    console.log("Selected Items: ", selectedItems);
    cart.addItem(selectedItems);
  }
      // Create an object with the selected informatio
    
  };
  

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMasterType, setSelectedMasterType] = useState<string | null>(
    null
  );
  const [selectedChildrenType, setSelectedChildrenType] = useState<
    string | null
  >(null);

  const [selectedThirdType, setSelectedThirdType] = useState<string | null>(
    null
  );
  const [selectedQuantity, setQuantity] = useState<number>(1);
  const uniqueColors = Array.from(
    new Set(data?.values.map((value) => value.color.value))
  );

  const calculateAvailableMasterTypes = (
    selectedColor: string | null
  ): string[] => {
    const filteredMasterTypes = data?.values
      .filter((value) => !selectedColor || value.color.value === selectedColor)
      .map((value) => value.typevaluemaster);

    return Array.from(new Set(filteredMasterTypes || []));
  };

  const uniqueMasterTypes = calculateAvailableMasterTypes(selectedColor);

  const calculateAvailableChildrenTypes = (
    selectedColor: string | null,
    selectedMasterType: string | null
  ): string[] => {
    const filteredChildrenTypes = data?.values
      .filter(
        (value) =>
          (!selectedColor || value.color.value === selectedColor) &&
          (!selectedMasterType || value.typevaluemaster === selectedMasterType)
      )
      .map((value) => value.typevaluechildren);

    return Array.from(new Set(filteredChildrenTypes || []));
  };

  const calculateAvailableThirdTypes = (
    selectedColor: string | null,
    selectedMasterType: string | null,
    selectedChildrenType: string | null
  ): string[] => {
    const filteredThirdTypes = data?.values
      .filter(
        (value) =>
          (!selectedColor || value.color.value === selectedColor) &&
          (!selectedMasterType ||
            value.typevaluemaster === selectedMasterType) &&
          (!selectedChildrenType ||
            value.typevaluechildren === selectedChildrenType)
      )
      .map((value) => value.typevaluethird);

    return Array.from(new Set(filteredThirdTypes || []));
  };

  const uniqueChildrenTypes = calculateAvailableChildrenTypes(
    selectedColor,
    selectedMasterType
  );

  const uniqueThirdTypes = calculateAvailableThirdTypes(
    selectedColor,
    selectedMasterType,
    selectedChildrenType
  );

  const handleColorSelection = (color: string): void => {
    setSelectedColor(color === selectedColor ? null : color);
    setSelectedMasterType(null); // Reset master type when color changes
    setSelectedChildrenType(null); // Reset children type when color changes
    setSelectedThirdType(null); // Reset third type when color changes
  };

  const handleMasterTypeSelection = (type: string): void => {
    setSelectedMasterType(type);
    setSelectedChildrenType(null); // Reset children type when master type changes
    setSelectedThirdType(null); // Reset third type when master type changes
  };

  const handleChildrenTypeSelection = (type: string): void => {
    setSelectedChildrenType(type === selectedChildrenType ? null : type);
    setSelectedThirdType(null); // Reset third type when children type changes
  };

  const handleThirdTypeSelection = (type: string): void => {
    setSelectedThirdType(type === selectedThirdType ? null : type);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      switch (data.mode) {
        case "1":
          // Mode 1: Adjust quantity based on color
          const availableQuantityMode1 =
            data?.values
              .filter(
                (productValue) => productValue.color.value === selectedColor
              )
              .reduce((acc, productValue) => acc + productValue.quantity, 0) ||
            0;

          if (newQuantity <= availableQuantityMode1) {
            setQuantity(newQuantity);
          }
          break;
        case "2":
          // Mode 2: Adjust quantity based on color and master type
          const availableQuantityMode2 =
            data?.values.find(
              (productValue) =>
                productValue.color.value === selectedColor &&
                productValue.typevaluemaster === selectedMasterType
            )?.quantity || 0;

          if (newQuantity <= availableQuantityMode2) {
            setQuantity(newQuantity);
          }
          break;
        case "3":
          // Mode 3: Adjust quantity based on color, master type, and children type
          const availableQuantityMode3 =
            data?.values.find(
              (productValue) =>
                productValue.color.value === selectedColor &&
                productValue.typevaluemaster === selectedMasterType &&
                productValue.typevaluechildren === selectedChildrenType
            )?.quantity || 0;

          if (newQuantity <= availableQuantityMode3) {
            setQuantity(newQuantity);
          }
          break;
        case "4":
          // Mode 4: Adjust quantity based on color, master type, children type, and third type
          const availableQuantityMode4 =
            data?.values.find(
              (productValue) =>
                productValue.color.value === selectedColor &&
                productValue.typevaluemaster === selectedMasterType &&
                productValue.typevaluechildren === selectedChildrenType &&
                productValue.typevaluethird === selectedThirdType
            )?.quantity || 0;

          if (newQuantity <= availableQuantityMode4) {
            setQuantity(newQuantity);
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (uniqueColors.length === 1) {
      setSelectedColor(uniqueColors[0]);
    }
    console.log("Effect - selectedColor:", selectedColor);
    console.log("Effect - selectedMasterType:", selectedMasterType);
    console.log("Effect - selectedChildrenType:", selectedChildrenType);
    console.log("Effect - selectedThirdType:", selectedThirdType);
  }, [
    selectedColor,
    selectedMasterType,
    selectedChildrenType,
    selectedThirdType,
    uniqueColors,
  ]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    if (data && data.values && data.values.length > 0) {
      const prices = data.values.map((value) =>
        parseFloat(value.price.toString())
      );

      if (prices.every((price) => !isNaN(price))) {
        const calculatedMinPrice = Math.min(...prices);
        const calculatedMaxPrice = Math.max(...prices);

        setMinPrice(calculatedMinPrice);
        setMaxPrice(calculatedMaxPrice);
      }
    }
  }, [data]);

  const isAddToCartEnabled = (): boolean => {
    if (data.mode === "2") {
      return true;
    } else if (data.mode === "3") {
      return !!selectedMasterType;
    } else if (data.mode === "4") {
      return (
        !!selectedMasterType && !!selectedChildrenType && !!selectedThirdType
      );
    }
    return false;
  };

  const renderDropdown = (
    type: string,
    values: string[],
    selectedValue: string | null,
    handleSelection: (value: string) => void
  ): JSX.Element => {
    const isMasterType = type === "Master Type";
    const isChildrenType = type === "Children Type";
    const isThirdType = type === "Third Type";

    return (
      <div className="flex flex-row items-center gap-x-4">
        <select
          value={selectedValue || ""}
          onChange={(e) => handleSelection(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded"
          style={{ minWidth: "150px" }}
          disabled={
            (isMasterType && !selectedColor) ||
            (isChildrenType && !selectedMasterType) ||
            !selectedColor ||
            (isThirdType &&
              (!selectedMasterType || !selectedChildrenType || !selectedColor))
          }
        >
          {type === "Master Type" && (
            <option value="" hidden={!selectedValue}>
              Select 
            </option>
          )}
          {type === "Children Type" && (
            <option value="" hidden={!selectedValue}>
              Select 
            </option>
          )}
          {type === "Third Type" && (
            <option value="" hidden={!selectedValue}>
              Select 
            </option>
          )}
          {values.map((value) => (
            <option
              key={value}
              value={value}
              disabled={
                (isChildrenType &&
                  (!selectedMasterType ||
                    !data?.values.some(
                      (productValue) =>
                        productValue.color.value === selectedColor &&
                        productValue.typevaluemaster === selectedMasterType &&
                        productValue.typevaluechildren === value
                    ))) ||
                (isThirdType &&
                  (!selectedMasterType ||
                    !selectedChildrenType ||
                    !data?.values.some(
                      (productValue) =>
                        productValue.color.value === selectedColor &&
                        productValue.typevaluemaster === selectedMasterType &&
                        productValue.typevaluechildren ===
                          selectedChildrenType &&
                        productValue.typevaluethird === value
                    )))
              }
            >
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          {data.mode === "1" && (
            <div>
              {selectedColor && (
                <Currency
                  value={
                    data?.values.find(
                      (productValue) =>
                        productValue.color.value === selectedColor
                    )?.price
                  }
                />
              )}

              {!selectedColor && (
                <div>
                  {maxPrice > minPrice && (
                    <div className="felx items-center justify-between font-semibold">
                      ${minPrice} - ${maxPrice}
                    </div>
                  )}
                  {maxPrice === minPrice && (
                    <div className="felx items-center justify-between font-semibold">
                      <Currency value={minPrice} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {data.mode === "2" && (
            <div>
              {selectedMasterType && (
                <Currency
                  value={
                    data?.values.find(
                      (productValue) =>
                        productValue.color.value === selectedColor &&
                        productValue.typevaluemaster === selectedMasterType
                    )?.price
                  }
                />
              )}

              {!selectedMasterType && (
                <div>
                  {maxPrice > minPrice && (
                    <div className="felx items-center justify-between font-semibold">
                      ${minPrice} - ${maxPrice}
                      
                    </div>
                  )}
                  {maxPrice === minPrice && (
                    <div className="felx items-center justify-between font-semibold">
                      <Currency value={minPrice} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {data.mode === "3" && (
            <div>
              {selectedChildrenType && (
                <Currency
                  value={
                    data?.values.find(
                      (productValue) =>
                        productValue.color.value === selectedColor &&
                        productValue.typevaluemaster === selectedMasterType &&
                        productValue.typevaluechildren === selectedChildrenType
                    )?.price
                  }
                />
              )}

              {!selectedChildrenType && (
                <div>
                  {maxPrice > minPrice && (
                    <div className="felx items-center justify-between font-semibold">
                      ${minPrice} - ${maxPrice}
                    </div>
                  )}
                  {maxPrice === minPrice && (
                    <div className="felx items-center justify-between font-semibold">
                      <Currency value={minPrice} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {data.mode === "4" && (
            <div>
              {selectedThirdType && (
                <Currency
                  value={
                    data?.values.find(
                      (productValue) =>
                        productValue.color.value === selectedColor &&
                        productValue.typevaluemaster === selectedMasterType &&
                        productValue.typevaluechildren ===
                          selectedChildrenType &&
                        productValue.typevaluethird === selectedThirdType
                    )?.price
                  }
                />
              )}

              {!selectedThirdType && (
                <div>
                  {maxPrice > minPrice && (
                    <div className="felx items-center justify-between font-semibold">
                      ${minPrice} - ${maxPrice}
                    </div>
                  )}
                  {maxPrice === minPrice && (
                    <div className="felx items-center justify-between font-semibold">
                      <Currency value={minPrice} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </p>
      </div>
      <h1 className="text-1xl mt-3 text-gray-500">{data.description}</h1>

      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.value}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          {uniqueColors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorSelection(color)}
              disabled={selectedColor === color} // Disable the button if the color is already selected
              className="h-6 w-6 rounded-full border border-gray-600"
              style={{
                backgroundColor: color,
                border:
                  selectedColor && selectedColor !== color
                    ? "2px solid gray"
                    : "2px solid black",
              }}
            />
          ))}
        </div>
        {data.mode === "2" && (
          <div>
            <div className="flex flex-col gap-y-6">
            <div className="flex flex-row items-center gap-x-4">
              <h3 className="font-semibold text-black">{data?.mastertype}</h3>
              <div>
                {renderDropdown(
                  "Master Type",
                  uniqueMasterTypes,
                  selectedMasterType,
                  handleMasterTypeSelection
                )}
              </div>
            </div>
          
            <div className="flex flex-row items-center gap-x-4">
              <h3 className="font-semibold text-black">Quantity: </h3>
              <div>
                <input
                  type="number"
                  value={selectedQuantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="w-12 text-center border border-gray-300 rounded"
                  min="1"
                  max={
                    data?.values.find(
                      (productValue) =>
                        productValue.color.value === selectedColor &&
                        productValue.typevaluemaster === selectedMasterType
                    )?.quantity
                  }
                />
              </div>
            </div>
          </div></div>
        )}

        {data.mode === "3" && (
          <div>
            <div className="flex flex-col gap-y-6">
            <div className="flex flex-row items-center gap-x-4">
              <h3 className="font-semibold text-black">{data?.mastertype}</h3>
              <div>
                {renderDropdown(
                  "Master Type",
                  uniqueMasterTypes,
                  selectedMasterType,
                  handleMasterTypeSelection
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-4">
              <h3 className="font-semibold text-black">{data?.childrentype}</h3>
              <div>
                {renderDropdown(
                  "Children Type",
                  uniqueChildrenTypes,
                  selectedChildrenType,
                  handleChildrenTypeSelection
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-4">
              <h3 className="font-semibold text-black">Quantity: </h3>
              <div>
                <input
                  type="number"
                  value={selectedQuantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="w-12 text-center border border-gray-300 rounded"
                  min="1"
                  max={
                    data?.values.find(
                      (productValue) =>
                        productValue.color.value === selectedColor &&
                        productValue.typevaluemaster === selectedMasterType &&
                        productValue.typevaluechildren === selectedChildrenType
                    )?.quantity
                  }
                />
              </div>
            </div>
          </div></div>
        )}

        {data.mode === "4" && (
          <div>
            <div className="flex flex-col gap-y-6">
            <div className="flex flex-row items-center gap-x-4">
              <h3 className="font-semibold text-black">{data?.mastertype}</h3>
              <div>
                {renderDropdown(
                  "Master Type",
                  uniqueMasterTypes,
                  selectedMasterType,
                  handleMasterTypeSelection
                )}
              </div>
            </div>
            
            <div className="flex flex-row items-center gap-x-4">
              <h3 className="font-semibold text-black">{data?.childrentype}</h3>
              <div>
                {renderDropdown(
                  "Children Type",
                  uniqueChildrenTypes,
                  selectedChildrenType,
                  handleChildrenTypeSelection
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-4">
              <h3 className="font-semibold text-black">{data?.thirdtype}</h3>
              <div>
                {renderDropdown(
                  "Third Type",
                  uniqueThirdTypes,
                  selectedThirdType,
                  handleThirdTypeSelection
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-4">
              <h3 className="font-semibold text-black">Quantity: </h3>
              <div>
                <input
                  type="number"
                  value={selectedQuantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="w-12 text-center border border-gray-300 rounded"
                  min="1"
                  max={
                    data?.values.find(
                      (productValue) =>
                        productValue.color.value === selectedColor &&
                        productValue.typevaluemaster === selectedMasterType &&
                        productValue.typevaluechildren ===
                          selectedChildrenType &&
                        productValue.typevaluethird === selectedThirdType
                    )?.quantity
                  }
                />
              </div>
            </div>
          </div></div>
        )}
      </div>
      
      <div className="mt-10 flex items-center gap-x-3">
        {data.mode === "2" && (
          <Button
            onClick={onAddToCart}
            className="flex items-center gap-x-2"
            disabled={!selectedMasterType}
          >
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        )}

        {data.mode === "3" && (
          <Button
            onClick={onAddToCart}
            className="flex items-center gap-x-2"
            disabled={
              !selectedMasterType ||
              (data.mode === "3" && !selectedChildrenType)
            }
          >
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        )}

        {data.mode === "4" && (
          <Button
            onClick={onAddToCart}
            className="flex items-center gap-x-2"
            disabled={
              !selectedMasterType ||
              (data.mode === "4" &&
                (!selectedChildrenType || !selectedThirdType))
            }
          >
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        )}

        {data.mode === "1" && (
          <Button onClick={onAddToCart} className="flex items-center gap-x-2">
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Info;
