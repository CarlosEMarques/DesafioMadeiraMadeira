"use client";

import { useCart } from "@/context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCartClick = () => {
    const cartQuery = encodeURIComponent(JSON.stringify(cart));
    const checkoutUrl = `http://localhost:3001/?cart=${cartQuery}`;
    window.location.href = checkoutUrl;
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Ecommerce MadeiraMadeira
        </h1>

        <button
          className="relative flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition cursor-pointer"
          onClick={handleCartClick}
        >
          <FaShoppingCart size={28} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
