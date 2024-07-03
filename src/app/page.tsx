// pages/index.js (or Home.js)
import AppWrapper from "@/components/AppWrapper";
import StoryCollection from "@/components/collections/StoryCollection";
import HeroSection from "@/components/custom/hero/HeroSection";
import Stories from "@/components/stories/Stories";
import Image from "next/image";

export default function Home() {
  return (
    <AppWrapper>
      <HeroSection />
      <div className="grid grid-cols-12 pb-8">
        <div className="col-span-3 ">
          <h2 className="my-3 text-3xl font-semibold mb-7">
            Stories Collection
          </h2>
          <StoryCollection />
        </div>
        <div className="col-span-9">
          <h2 className="my-3 text-3xl font-semibold mb-7">Stories </h2>
          <Stories />
        </div>
      </div>
    </AppWrapper>
  );
}
