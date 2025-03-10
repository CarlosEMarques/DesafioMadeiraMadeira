"use client";

import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddToCartButtonProps {
  product: {
    id: number;
    title: string;
    price: number;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });

    toast.success(`${product.title} foi adicionado ao carrinho!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-700 transition cursor-pointer"
    >
      + Carrinho
    </button>
  );
}
