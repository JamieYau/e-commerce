import Categories from "@/components/Categories";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex w-full max-w-7xl flex-col">
      <Hero />
      <Categories />
    </div>
  );
}
