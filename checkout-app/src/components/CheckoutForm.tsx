"use client";

import type React from "react";

import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import type { FormData } from "@/types/checkout";
import { Button } from "@/components/ui/button";
import { InputWithError } from "@/components/ui/input-with-error";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckoutFormProps {
  register: UseFormRegister<FormData>;
  handleSubmit: (
    onSubmit: (data: FormData) => void
  ) => (e: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: (data: FormData) => void;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  isProcessing: boolean;
  total: number;
}

export function CheckoutForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  setValue,
  watch,
  isProcessing,
  total,
}: CheckoutFormProps) {
  const isSameAddress = watch("isSameAddress") || false;

  const fetchAddress = async (cep: string, type: "billing" | "delivery") => {
    if (cep.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setValue(`${type}City` as keyof FormData, data.localidade);
        setValue(`${type}State` as keyof FormData, data.uf);
        setValue(`${type}Address` as keyof FormData, data.logradouro);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
      <h2 className="text-2xl font-bold text-gray-900 cursor-pointer">
        Finalizar Compra
      </h2>

      <InputWithError
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email é obrigatório" })}
        error={errors.email?.message}
      />

      <InputWithError
        type="text"
        placeholder="Nome completo"
        {...register("name", { required: "Nome é obrigatório" })}
        error={errors.name?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputWithError
          type="text"
          placeholder="Número do Cartão"
          {...register("cardNumber", {
            required: "Número do cartão é obrigatório",
          })}
          error={errors.cardNumber?.message}
        />
        <div className="grid grid-cols-2 gap-4">
          <InputWithError
            type="text"
            placeholder="MM/AA"
            {...register("expiry", { required: "Validade é obrigatória" })}
            error={errors.expiry?.message}
          />
          <InputWithError
            type="text"
            placeholder="CVC"
            {...register("cvc", { required: "CVC é obrigatório" })}
            error={errors.cvc?.message}
          />
        </div>
      </div>

      <InputWithError
        type="text"
        placeholder="CEP de Cobrança"
        {...register("billingCep", { required: "CEP é obrigatório" })}
        onBlur={(e) => fetchAddress(e.target.value, "billing")}
        error={errors.billingCep?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputWithError
          type="text"
          placeholder="Endereço"
          {...register("billingAddress", {
            required: "Endereço é obrigatório",
          })}
          error={errors.billingAddress?.message}
        />
        <InputWithError
          type="text"
          placeholder="Número"
          {...register("billingNumber", { required: "Número é obrigatório" })}
          error={errors.billingNumber?.message}
        />
      </div>

      <InputWithError
        type="text"
        placeholder="Complemento"
        {...register("billingComplement")}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputWithError
          type="text"
          placeholder="Cidade"
          {...register("billingCity")}
          readOnly
        />
        <InputWithError
          type="text"
          placeholder="Estado"
          {...register("billingState")}
          readOnly
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="sameAddress"
          checked={!!watch("isSameAddress")}
          onCheckedChange={(checked) =>
            setValue("isSameAddress", Boolean(checked))
          }
        />
        <Label htmlFor="sameAddress">
          Endereço de entrega é o mesmo de cobrança
        </Label>
      </div>

      {!isSameAddress && (
        <>
          <InputWithError
            type="text"
            placeholder="CEP de Entrega"
            {...register("deliveryCep", {
              required: "CEP de entrega é obrigatório",
            })}
            onBlur={(e) => fetchAddress(e.target.value, "delivery")}
            error={errors.deliveryCep?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputWithError
              type="text"
              placeholder="Endereço de Entrega"
              {...register("deliveryAddress", {
                required: "Endereço é obrigatório",
              })}
              error={errors.deliveryAddress?.message}
            />
            <InputWithError
              type="text"
              placeholder="Número"
              {...register("deliveryNumber", {
                required: "Número é obrigatório",
              })}
              error={errors.deliveryNumber?.message}
            />
          </div>

          <InputWithError
            type="text"
            placeholder="Complemento"
            {...register("deliveryComplement")}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputWithError
              type="text"
              placeholder="Cidade"
              {...register("deliveryCity")}
              readOnly
            />
            <InputWithError
              type="text"
              placeholder="Estado"
              {...register("deliveryState")}
              readOnly
            />
          </div>
        </>
      )}

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={isProcessing}
      >
        {isProcessing
          ? "Processando..."
          : `Finalizar Compra - R$${total.toFixed(2)}`}
      </Button>
    </form>
  );
}
