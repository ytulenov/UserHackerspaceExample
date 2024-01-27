export interface Product {
    id: string;
    category: Category;
    name: string;
    isFeatured: boolean;
    description: string; 
    mastertype: string;
    childrentype: string;
    thirdtype: string;
    mode: string;
    size: Size;
    values: Productvalue[];
    orderItem: OrderItem;
  };
//http://localhost:3001/confirmation/aff58b64-bfd0-4e6c-acfe-968052afb5d4
  export interface Productvalue{
    id: string;
    color: Color;
    price: number;
    index: number;
    quantity: number;
    product: Product;
    images: Image[];
    typevaluethird: string;
    typevaluemaster: string;
    typevaluechildren:   string;
  }
  
  export interface Image {
    id: string;
    url: string;
  }
  
  export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
  };
  
  export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
  };
  
  export interface Size {
    id: string;
    name: string;
    value: string;
  };
  
  export interface Color {
    id: string;
    name: string;
    value: string;
  };
  
  export interface Order {
    id: string;
    firstname: string;
    lastname: string;
    personalemail: string;
    studentemail: string;
    orderItems: OrderItem[];
    totalPrice: number;
    confirmationid: number;
  }

  export interface OrderItem{
    id: string;
    product: Product;
    productvalue: Productvalue;
    productvalueId: string;
    quantity: number;
    productIndex: number;
    order: Order;
    productId: string;
  }