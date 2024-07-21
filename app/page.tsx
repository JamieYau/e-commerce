import Categories from "@/components/Categories";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="m-auto flex w-full max-w-7xl flex-1 flex-col p-2 sm:p-8">
      <Hero />
      <Categories />
    </div>
  );
}
