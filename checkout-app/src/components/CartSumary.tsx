"use client";

import type React from "react";

import { useState } from "react";
import type { CartItem } from "@/types/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface CartSummaryProps {
  cart: CartItem[] | null;
  setCart: React.Dispatch<React.SetStateAction<CartItem[] | null>>;
  calculateTotal: () => number;
}

export function CartSummary({
  cart,
  setCart,
  calculateTotal,
}: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(
      (prev) =>
        prev?.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        ) || null
    );
  };

  const handleDeleteItem = (id: number) => {
    setCart((prev) => prev?.filter((item) => item.id !== id) || null);
  };

  return (
    <div className="w-full lg:w-96 bg-gray-50 p-6 rounded-lg shadow-inner">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Resumo do Pedido</h3>
      {cart && cart.length > 0 ? (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">
                  R${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">O carrinho está vazio.</p>
      )}

      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>R${calculateTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Frete</span>
          <span>R$0.00</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>R${calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Cupom de desconto"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button variant="outline">Aplicar</Button>
        </div>
      </div>

      <Button variant="outline" className="w-full mt-4">
        Continuar Comprando
      </Button>
    </div>
  );
}
