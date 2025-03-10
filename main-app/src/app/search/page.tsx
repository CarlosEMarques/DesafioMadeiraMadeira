// src/app/search/page.tsx
import { getProducts } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/products";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;
  const products: Product[] = await getProducts();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query?.toLowerCase() || "")
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-500">
        Resultados para: {query || "nenhum termo"}
      </h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>Nenhum produto encontrado para {query}.</p>
      )}
    </div>
  );
}
