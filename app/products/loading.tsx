import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const array = new Array(8).fill(null);
  return (
    <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {array.map((_, i) => (
        <li key={i} className="">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </li>
      ))}
    </ul>
  );
}
