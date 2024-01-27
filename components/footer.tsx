"use client";


import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";


const Footer = () => {
    const [isMounted, setIsMounted] = useState(false); 

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    if (!isMounted) {
        return null;
    }

    return(
        <footer
            className = "bg-white border-t"
        >

            <div
                className = "mx-auto py-10 flex flex-col items-center"
            >
                
                <div className="flex items-center gap-x-4 mb-4">
                    <Button
                        onClick={() => router.push("/aboutus")}
                        className="flex items-center rounded-full bg-black px-2 py-2"
                    >
                        <span className="ml-2 mr-2 text-sm font-medium text-white">
                        About Us
                        </span>
                    </Button>

                    <Button
                        onClick={() => router.push("/faq")}
                        className="flex items-center rounded-full bg-black px-2 py-2"
                    >
                        <span className="ml-2 mr-2 text-sm font-medium text-white">
                        FAQ
                        </span>
                    </Button>
                    <Button
                        onClick={() => router.push("/privacy")}
                        className="flex items-center rounded-full bg-black px-2 py-2"
                    >
                        <span className="ml-2 mr-2 text-sm font-medium text-white">
                        Privacy
                        </span>
                    </Button>
                    </div>


                <p
                    className = "text-center text-xs text-black"
                >
                    &copy; 2023 HackerSpaceStore, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;