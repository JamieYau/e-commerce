import { getProduct } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-full w-full flex-1 p-4">
      <div className="m-auto max-w-7xl md:flex md:gap-12">
        {/* Product Image */}
        <div className="mb-4 md:mb-0 md:w-1/2">
          <img
            src={product.imageUrl || "/images/placeholder.png"}
            alt={product.name}
            className="rounded border-4 object-cover"
          />
          <div className="mt-2 grid grid-cols-4 gap-2">
            <img
              src="/images/placeholder.png"
              alt="Side view"
              className="w-full rounded border-4"
            />
            <img
              src="/images/placeholder.png"
              alt="Front view"
              className="w-full rounded border-4"
            />
            <img
              src="/images/placeholder.png"
              alt="Angle view"
              className="w-full rounded border-4"
            />
            <img
              src="/images/placeholder.png"
              alt="Alt view"
              className="w-full rounded border-4"
            />
          </div>
        </div>
        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="mb-2 text-sm">
            <span>{product.category.name}</span>
          </div>
          <div className="mb-2 flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-muted-foreground">132 reviews</span>
          </div>
          <div className="mb-4">{product.description}</div>
          <div className="mb-4">
            <span className="text-3xl font-semibold">GBP £{product.price}</span>
          </div>

          <Button variant={"default"} className="w-60">
            Add to cart
          </Button>
        </div>
      </div>
    </main>
  );
}
