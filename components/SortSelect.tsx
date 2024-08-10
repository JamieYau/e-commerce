"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export const SORT_OPTIONS = [
  { name: "Price (Low to High)", value: "price-asc" },
  { name: "Price (High to Low)", value: "price-desc" },
  { name: "Newest", value: "newest" },
  { name: "Rating", value: "rating" },
] as const;

export default function SortSelect() {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const params = new URLSearchParams(currentSearchParams);

  const handleSortChange = (value: string) => {
    // Update the sort parameter
    params.set("sort", value);

    // Update the URL, which will re-trigger the products query with new sort
    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSortChange} value={params.get("sort") || ""}>
      <SelectTrigger className="max-w-44 lg:flex lg:max-w-full">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
