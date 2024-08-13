import { getCategories } from "@/actions/categoryActions";
import ProductFiltersForm from "./ProductFiltersForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default async function ProductFilters() {
  const categories = await getCategories();

  return (
    <>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-1 text-muted-foreground">
              <FilterIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:min-w-[450px]">
            <SheetHeader className="mb-8">
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription className="hidden">
                Add Filters here
              </SheetDescription>
            </SheetHeader>
            <Suspense>
              <ProductFiltersForm categories={categories} />
            </Suspense>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:mt-4 lg:block">
        <Suspense>
          <ProductFiltersForm categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
