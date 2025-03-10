import type { FormData } from "@/types/checkout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderConfirmationProps {
  orderNumber: string;
  formData: FormData | null;
}

export function OrderConfirmation({
  orderNumber,
  formData,
}: OrderConfirmationProps) {
  if (!formData) return null;

  return (
    <div className="w-full p-6 bg-green-50 rounded-lg shadow-md text-center">
      <h3 className="text-2xl font-bold mb-4 text-green-800">
        Pedido Confirmado!
      </h3>
      <div className="space-y-2 text-left">
        <p className="text-gray-700">
          Número do Pedido: <span className="font-semibold">{orderNumber}</span>
        </p>
        <p className="text-gray-700">
          Nome: <span className="font-semibold">{formData.name}</span>
        </p>
        <p className="text-gray-700">
          E-mail: <span className="font-semibold">{formData.email}</span>
        </p>
        <p className="text-gray-700">
          Endereço de Entrega:{" "}
          <span className="font-semibold">
            {formData.deliveryAddress || formData.billingAddress},{" "}
            {formData.deliveryNumber || formData.billingNumber},{" "}
            {formData.deliveryCity || formData.billingCity} -{" "}
            {formData.deliveryState || formData.billingState}
          </span>
        </p>
      </div>
      <Link href="/" className="" aria-label="Voltar">
        <Button
          variant="outline"
          className="text-lg cursor-pointer flex float-end w-40 items-center justify-center bg-blue-500 text-white rounded-md shadow-md transition-all hover:bg-blue-600 hover:text-white"
        >
          Voltar
        </Button>
      </Link>
    </div>
  );
}
