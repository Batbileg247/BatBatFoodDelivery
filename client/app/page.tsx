import { getCategories } from "@/lib/services/get-categories";
import { MenuItems } from "./_components/MenuItems";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

export default async function Home() {
  const { categories } = await getCategories();
  return (
    <div>
      <Header />
      <img src="bg.png" alt="" className="w-full" />
      <MenuItems categories={categories} />
      <Footer />
    </div>
  );
}
