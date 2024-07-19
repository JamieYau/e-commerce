import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const array = new Array(8).fill(null);
  return (
    <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {array.map((_, i) => (
        <li key={i}>
          <div className="flex flex-col gap-2">
            <div className="relative w-full pt-[75%]">
              <Skeleton className="absolute inset-0 h-full w-full rounded-md object-cover" />
            </div>
            <Skeleton className="h-5 w-3/4" /> {/* Product name */}
            <Skeleton className="h-4 w-full" /> {/* Product description */}
            <Skeleton className="h-4 w-1/4" /> {/* Price */}
          </div>
        </li>
      ))}
    </ul>
  );
}
