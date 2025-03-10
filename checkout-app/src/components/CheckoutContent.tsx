"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CartSummary } from "./CartSumary";
import { CheckoutForm } from "./CheckoutForm";
import type { CartItem, FormData } from "@/types/checkout";
import { OrderConfirmation } from "./OrderConfirmation";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const cartQuery = searchParams.get("cart");
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (cartQuery) {
      setCart(JSON.parse(decodeURIComponent(cartQuery)));
    }
  }, [cartQuery]);

  const onSubmit = (data: FormData) => {
    setIsProcessing(true);
    setFormData(data);

    // Simulating API call
    setTimeout(() => {
      setOrderNumber(`#${Math.floor(Math.random() * 1000000)}`);
      setIsProcessing(false);
    }, 2000);
  };

  const calculateTotal = () => {
    return (
      cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
          {!orderNumber ? (
            <>
              <CheckoutForm
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                setValue={setValue}
                watch={watch}
                isProcessing={isProcessing}
                total={calculateTotal()}
              />
              <CartSummary
                cart={cart}
                setCart={setCart}
                calculateTotal={calculateTotal}
              />
            </>
          ) : (
            <OrderConfirmation orderNumber={orderNumber} formData={formData} />
          )}
        </div>
      </div>
    </div>
  );
}
