import Products from "@/components/Products";
import { Suspense } from "react";
import Loading from "./loading";

export default function page() {
  return (
    <main className="flex min-h-full w-full flex-1 flex-col items-center p-4">
      <h1 className="my-8 text-3xl font-bold">All Products</h1>
      <div className="mx-auto w-full max-w-7xl">
        <Suspense fallback={<Loading />}>
          <Products />
        </Suspense>
      </div>
    </main>
  );
}
