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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function page() {
  return (
    <div className="m-auto flex w-full max-w-7xl flex-col p-2 sm:px-8">
      <Breadcrumb>
        <BreadcrumbList className="gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col lg:grid lg:grid-cols-10">
        <div className="flex h-full w-full flex-col gap-2 pt-4 lg:col-span-2">
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
        <div className="mx-auto w-full max-w-7xl pt-4 lg:col-span-8">
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
