// src/app/page.tsx
"use client";

import { Suspense } from "react";
import CheckoutContent from "@/components/CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutContent />
    </Suspense>
  );
}

function Loading() {
  return <p className="text-center">Carregando...</p>;
}
