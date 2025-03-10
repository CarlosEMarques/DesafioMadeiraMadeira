import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import type { Product } from "@/types/products";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-xl bg-white transition-all duration-300 hover:shadow-md">
      {product.price < 50 && (
        <div className="absolute left-0 top-4 z-10 rounded-r-lg bg-red-600 px-4 py-1.5 text-sm font-bold text-white shadow-md animate-pulse">
          <span className="relative inline-flex items-center">
            <span className="mr-1">•</span>
            OFERTA
          </span>
        </div>
      )}

      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          style={{ objectFit: "contain" }}
          className="transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />

        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/5 group-hover:opacity-100">
          <Link
            href={`/product/${product.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-primary hover:text-primary-foreground"
            aria-label="Ver detalhes do produto"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col p-4">
        <div className="mb-2 flex items-start justify-between">
          <h2 className="line-clamp-2 text-base font-medium text-gray-800 group-hover:text-primary">
            {product.title}
          </h2>
        </div>

        <p className="mb-3 line-clamp-2 text-xs text-gray-500">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-800">
              ${product.price.toFixed(2)}
            </span>
            {product.price >= 100 && (
              <span className="text-xs text-gray-800">
                ou 12x de ${(product.price / 12).toFixed(2)}
              </span>
            )}
          </div>

          <AddToCartButtonWrapper product={product} />
        </div>
      </div>
    </div>
  );
}

function AddToCartButtonWrapper({
  product,
}: {
  product: { id: number; title: string; price: number };
}) {
  return (
    <div className="relative">
      <AddToCartButton
        product={{
          id: product.id,
          title: product.title,
          price: product.price,
        }}
      />
    </div>
  );
}
