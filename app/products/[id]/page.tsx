import { getProduct } from "@/actions/productActions";
import Badge from "@/components/Badge";
import ProductTabs from "@/components/ProductTabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { badges } from "@/lib/badgeData";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Recommended from "@/components/Recommended";
import Reviews from "@/components/Reviews";
import StarRating from "@/components/StarRating";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="m-auto w-full max-w-7xl px-4 py-2 sm:p-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList className="gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* Make link use category search param */}
            <BreadcrumbLink asChild>
              <Link href="/products"> {product.category.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <article className="md:flex md:gap-12">
        {/* Product Image */}
        <figure className="mb-4 md:mb-0 md:w-1/2">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={product.imageUrl || "/images/placeholder.png"}
              alt={product.name}
              fill
              priority
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
          <div className="mb-2 flex items-center">
            <StarRating rating={product.avgRating} />
            <span className="ml-2 text-muted-foreground">
              {product.totalReviews} reviews
            </span>
          </div>
          <div className="mb-4">{product.description}</div>
          <div className="mb-4">
            <span className="text-3xl font-semibold">GBP £{product.price}</span>
          </div>

          <AddToCartButton productId={product.id} productName={product.name} />
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
      <Reviews product={product} />
    </div>
  );
}
