import { Hero } from "@/components/home/hero";
import { ImageCarousel } from "@/components/home/image-carousel";
import { FeaturedMix } from "@/components/home/featured-mix";
import { UpcomingEvent } from "@/components/home/upcoming-event";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ImageCarousel />
      <FeaturedMix />
      <UpcomingEvent />
    </div>
  );
}
