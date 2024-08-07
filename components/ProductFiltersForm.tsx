"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Category } from "@/types/db";
import { Slider } from "./ui/slider";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  categories: z.array(z.string()),
  priceRange: z.tuple([z.number(), z.number()]),
});

interface ProductFiltersFormProps {
  categories: Category[];
}

export default function ProductFiltersForm({
  categories,
}: ProductFiltersFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: params.get("category")
        ? params.get("category")!.split(",")
        : [],
      priceRange: [
        params.get("minPrice") ? parseInt(params.get("minPrice")!) : 0,
        params.get("maxPrice") ? parseInt(params.get("maxPrice")!) : 2000,
      ], // Default price range
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Set category params as comma-separated values
    if (data.categories.length > 0) {
      params.set("category", data.categories.join(","));
    } else {
      params.delete("category");
    }

    // Set price range params
    params.set("minPrice", data.priceRange[0].toString());
    params.set("maxPrice", data.priceRange[1].toString());

    // Update the URL
    router.push(`?${params.toString()}`);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  function clearFilters() {
    form.reset();
    router.push("/products");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Accordion type="multiple">
          <Button
            variant={"default"}
            onClick={() => clearFilters()}
            type="reset"
          >
            Clear Filters
          </Button>
          <AccordionItem value="item-1">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    {categories.map((category) => (
                      <FormItem
                        key={category.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(
                              category.id.toString(),
                            )}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, category.id.toString()]
                                : field.value.filter(
                                    (id) => id !== category.id.toString(),
                                  );
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {category.name}
                        </FormLabel>
                      </FormItem>
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Range</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={2000}
                        step={1}
                        value={field.value}
                        onValueChange={field.onChange}
                        minStepsBetweenThumbs={50}
                      />
                    </FormControl>
                    <div className="mt-2 flex justify-between text-sm">
                      <span>£{field.value[0]}</span>
                      <span>£{field.value[1]}</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
