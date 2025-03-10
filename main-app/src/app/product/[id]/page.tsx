import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/services/api";
import { Product } from "@/types/products";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);
  if (isNaN(productId)) {
    return <div className="p-4 text-red-500">ID do produto inválido.</div>;
  }

  const product: Product | null = await getProductById(productId);
  if (!product) {
    return <div className="p-4 text-red-500">Produto não encontrado.</div>;
  }

  const { title, image, description, price } = product;

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto mt-10">
        {/* Botão de voltar */}
        <Link href="/">
          <span className="text-blue-500 hover:underline cursor-pointer">
            &larr; Voltar
          </span>
        </Link>

        {/* Imagem do produto */}
        <div className="relative w-full h-80 rounded-lg overflow-hidden mt-4">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            style={{ objectFit: "contain" }}
            className="rounded-lg bg-gray-100"
            unoptimized
          />
        </div>

        {/* Informações do produto */}
        <div className="mt-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 text-sm">{description}</p>
          <p className="text-2xl font-bold text-blue-600">
            ${price.toFixed(2)}
          </p>
        </div>

        {/* Botão de ação */}
        <div className="mt-6 flex justify-end">
          <AddToCartButton
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
            }}
          />
        </div>
      </div>
    </div>
  );
}
