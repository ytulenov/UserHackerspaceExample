"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";

import Summary from "./components/summary";
export const revalidate = 0;

const FeedbackPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Feedback</h1>
          <div className="ml-12 mr-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FeedbackPage;