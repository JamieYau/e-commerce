"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  setIsSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
}

export default function SearchBar({
  setIsSearchVisible,
  isVisible,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();

      const query = inputRef.current?.value || "";
      const params = new URLSearchParams(searchParams);

      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.push(`/products?${params}`);
    };

  return (
    <div
      className={cn(
        `absolute left-0 top-full hidden w-full bg-background p-4 shadow-sm sm:static sm:flex sm:max-w-80 sm:p-0 sm:shadow-none`,
        isVisible && "flex",
      )}
    >
      <form
        onSubmit={handleSubmit}
        className={cn(`flex w-full items-center gap-1`)}
      >
        <div className="flex w-full items-center gap-2 rounded-xl border p-2">
          <Search className="h-5 w-5" aria-hidden="true" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search..."
            className="h-6 w-full border-none p-0 focus-visible:ring-transparent"
            aria-label="Search input"
          />
        </div>
        <Button
          type="button"
          variant="ghost"
          className="sm:hidden"
          onClick={() => setIsSearchVisible(false)}
          aria-label="Close search"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}
