
import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import getOrder from "@/actions/get-order";
import Summary from "./components/summary";
import PurchasedItem from "./components/purchased-item";
export const revalidate = 0;

interface ConfirmationPageProps {
  params: {
    orderId: string;
  };
  searchParams: {
    firstname: string; 
    lastname: string;
    confirmationid: number;
  };
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = async ({
  params,
  searchParams,
}) => {
  const order = await getOrder(params.orderId);

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">
            Order Confirmation #{order.confirmationid} 
          </h1>
          <div className="lg:col-span-7">
            <p className="text-xl">
              Thank you for shopping with us, {order.firstname}!
            </p>
            <p className="text-l">
              We have sent a confirmation email to {order.personalemail}.
            </p>
          </div>
          <div className="ml-14 mr-14 mt-10">
            
            {<PurchasedItem orderItems={order.orderItems} totalPrices={order.totalPrice}/>}
          </div>
          <h2 className="text-xl mt-5  ml-12 font-bold text-black">Feedback</h2>
          <div className="ml-12 mr-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ConfirmationPage;
