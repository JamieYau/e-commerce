import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryDropdownLoading() {
  return (
    <Select disabled>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Loading..." />
      </SelectTrigger>
      <SelectContent>
        <Skeleton className="h-8 w-full" />
      </SelectContent>
    </Select>
  );
}
