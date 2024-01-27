"use client";
import axios from "axios";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";
import Container from "@/components/ui/container";

// ... (import statements)

const SearchPage = () => {
  const search = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchQuery = search ? search?.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodedSearchQuery}`
        );
        console.log("Backend Response:", response.data);

        // Set the search results in the state
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);

        // Log additional information from the AxiosError object
        if (axios.isAxiosError(error)) {
          console.error(
            "Error Details:",
            error.response?.data || error.request || error.message
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (encodedSearchQuery) {
      fetchData();
    }
  }, [encodedSearchQuery]);

  console.log("SEARCH PARAMS", encodedSearchQuery);

  return (
    <Container>
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="mt-5 font-bold">
          Search Results for{" "}
          <span className="italic">&apos;{searchQuery}&apos;</span>
        </h2>
        <div className="lg:grid mt-6 lg:grid-cols-5 lg:gap-x-8">
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {searchResults.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults.map((result) => (
                <ProductCard key={result.id} data={result} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SearchPage;
