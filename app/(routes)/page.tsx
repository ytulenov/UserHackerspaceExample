import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  let products, billboard;

  try {
    products = await getProducts({ isFeatured: true });
    billboard = await getBillboard("47452aaa-e1fe-4be8-a4f0-86771a486e3d");
    // ... rest of your code
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error or throw it again depending on your requirements
    throw error;
  }
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
