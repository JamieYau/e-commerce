import { getProduct } from "@/actions/productActions";
import Badge from "@/components/Badge";
import ProductTabs from "@/components/ProductTabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { badges } from "@/lib/badgeData";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Recommended from "@/components/Recommended";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-full w-full flex-1 p-4">
      <div className="m-auto w-full max-w-7xl p-4 sm:p-8">
        <article className="md:flex md:gap-12">
          {/* Product Image */}
          <figure className="mb-4 md:mb-0 md:w-1/2">
            <AspectRatio ratio={4 / 3}>
              <Image
                src={product.imageUrl || "/images/placeholder.png"}
                alt={product.name}
                fill
                sizes="(min-width: 1380px) 576px, (min-width: 780px) calc(45.86vw - 48px), (min-width: 640px) calc(100vw - 104px), calc(100vw - 72px)"
                className="rounded border-4 object-cover"
              />
            </AspectRatio>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {new Array(4).fill(0).map((_, index) => (
                <AspectRatio ratio={3 / 2} key={index}>
                  <Image
                    src="/images/placeholder.png"
                    alt="Alt view"
                    fill
                    sizes="(min-width: 1380px) 132px, (min-width: 780px) calc(11.38vw - 23px), (min-width: 640px) calc(25vw - 38px), calc(25vw - 30px)"
                    className="w-full rounded border-4 object-cover"
                  />
                </AspectRatio>
              ))}
            </div>
          </figure>
          {/* Product Details */}
          <section className="md:w-1/2">
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
              <span className="text-3xl font-semibold">
                GBP £{product.price}
              </span>
            </div>

            <Button variant={"default"} className="w-44">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to cart
            </Button>
            <Separator className="my-8" />
            <ul className="grid grid-cols-2 gap-y-6">
              {badges.map((badge, index) => (
                <Badge key={index} icon={badge.icon} label={badge.label} />
              ))}
            </ul>
          </section>
        </article>
        {/* Extra Details */}
        <ProductTabs product={product} />
        <Recommended product={product} />
      </div>
    </main>
  );
}
