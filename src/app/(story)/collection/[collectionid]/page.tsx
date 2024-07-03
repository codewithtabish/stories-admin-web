import AppWrapper from "@/components/AppWrapper";
import StoryCollection from "@/components/collections/StoryCollection";
import HeroSection from "@/components/custom/hero/HeroSection";
import Stories from "@/components/stories/Stories";
import fetchStories from "@/utils/fetchStories";
import React, { Suspense } from "react";

const page = async ({ params }: { params: { collectionid: string } }) => {
  const data = await fetchStories.fetchRealStoriesOfCategory(
    params.collectionid
  );
  console.log(data);

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
          <Suspense
            fallback={
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                omnis inventore optio quasi ipsam eius pariatur blanditiis
                voluptas officiis. Ex fuga sequi assumenda sed? Deleniti
                distinctio corrupti excepturi sapiente eligendi?
              </div>
            }
          >
            <Stories data={data} storyFromCollection={true} />
          </Suspense>
        </div>
      </div>
    </AppWrapper>
  );
};

export default page;
