"use client";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/db";

type ProductTabsProps = {
  product: Product;
};

export default function ProductTabs({ product }: ProductTabsProps) {
  const specsRef = useRef<HTMLDivElement>(null);
  const shippingRef = useRef<HTMLDivElement>(null);
  const returnsRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const heights = [
      specsRef.current?.clientHeight || 0,
      shippingRef.current?.clientHeight || 0,
      returnsRef.current?.clientHeight || 0,
    ];
    setMaxHeight(Math.max(...heights));
  }, [product]);

  return (
    <div className="mt-24">
      <Tabs defaultValue="specs" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="specs">Details</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
        </TabsList>
        <div style={{ minHeight: `${maxHeight + 8}px` }}>
          <TabsContent value="specs" ref={specsRef}>
            <h2 className="mb-2 text-lg font-semibold">Product Description</h2>
            <p>{product.description}</p>
            {product.specs && (
              <>
                <h3 className="mb-2 mt-4 text-lg font-semibold">
                  Specifications
                </h3>
                <ul>
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <li key={index} className="mb-1">
                      <strong>{key}: </strong>
                      {value}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </TabsContent>
          <TabsContent value="shipping" ref={shippingRef}>
            <h2 className="mb-2 text-lg font-semibold">Shipping Information</h2>
            <p>
              Free standard shipping on all orders. Expedited shipping options
              are available at checkout for an additional fee. Orders are
              processed within 1-2 business days, and delivery typically takes
              3-7 business days for standard shipping. International shipping
              times may vary.
            </p>
          </TabsContent>
          <TabsContent value="returns" ref={returnsRef}>
            <h2 className="mb-2 text-lg font-semibold">Return Policy</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you
              are not happy with your product, you can return it within 30 days
              of delivery for a full refund or exchange, provided the item is in
              its original condition and packaging. Return shipping costs are
              the responsibility of the customer unless the item is defective or
              incorrect.
            </p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
