import { getProducts } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/products";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="w-full h-56 md:h-72 lg:h-80 relative rounded-lg overflow-hidden mb-8">
          <Image
            src="/images/header.png"
            alt="Banner de e-commerce"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>

        {/* Barra de pesquisa */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Lista de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
