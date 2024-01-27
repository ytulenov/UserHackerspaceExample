import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image"
export const revalidate = 0;
import SearchBar from "@/components/search/search-bar";

const Navbar = async () => {
  const categories = await getCategories();

  return ( 
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="relative rounded-md overflow-hidden sm:h-16 sm:w-16">
              <Image 
                src="https://res.cloudinary.com/dfyy77lmi/image/upload/v1700045964/viqhpoeljisdzwwx5glh.png"
                fill
                alt=""
                className="object-contain object-center"
              />
            </p>
          </Link>
          <MainNav data={categories} />
          <SearchBar />

          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};
 
export default Navbar;