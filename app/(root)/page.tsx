import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeHero } from "@/components/home/home-hero";
import { PopularStartups } from "@/components/home/popular-startups";
import { HomeFooter } from "@/components/home/home-footer";

export const metadata = {
  title: "Root | bdapps",
  description: "Discover popular startups and innovative solutions on bdapps.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <HomeNavbar />
      <HomeHero />
      <PopularStartups />
      <HomeFooter />
    </div>
  );
}
