import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductFilters from "./ProductFilters";

export default function FiltersButton() {
  return (
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
        <ProductFilters />
      </SheetContent>
    </Sheet>
  );
}
