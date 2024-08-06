import { getCategories } from "@/actions/categoryActions";
import ProductFiltersForm from "./ProductFiltersForm";

export default async function ProductFilters() {
  const categories = await getCategories();

  return <ProductFiltersForm categories={categories} />;
}