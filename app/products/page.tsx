import Products from "@/components/Products";
import { Suspense } from "react";
import Loading from "@/components/ProductsLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoryDropdownLoading from "@/components/CategoryDropdownLoading";
import CategoryDropdown from "@/components/CategoryDropdown";

export default function page() {
  return (
    <main className="flex min-h-full w-full flex-1 flex-col items-center p-4 lg:grid lg:grid-cols-4">
      <div className="flex h-full w-full flex-col gap-2 pt-4 lg:col-span-1">
        <h2 className="font-semibold">Filters</h2>
        <div className="flex gap-4 lg:flex-col">
          <Suspense fallback={<CategoryDropdownLoading />}>
            <CategoryDropdown />
          </Suspense>
          <Select>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mx-auto pt-4 w-full max-w-7xl lg:col-span-3">
        <Suspense fallback={<Loading />}>
          <Products />
        </Suspense>
      </div>
    </main>
  );
}
