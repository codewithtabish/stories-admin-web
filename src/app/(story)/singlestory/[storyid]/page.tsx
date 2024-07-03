import SimilarStories from "@/components/stories/SimilarStories";
import SingleStory from "@/components/stories/SingleStory";
import StoryReadImage from "@/components/stories/StoryReadImage";
import fetchStories from "@/utils/fetchStories";
import React from "react";
const page = async ({ params }: { params: { storyid: string } }) => {
  const data = await fetchStories.fetchSingleStory(params.storyid);
  console.log(data);
  return (
    <>
      <StoryReadImage storyImage={data?.imageUrl} />
      <div className="grid md:grid-cols-12 gap-3">
        <div className="col-span-10">
          <SingleStory storyData={data} />
        </div>
        <div className="col-span-2">
          <div className="flex justify-end">
            <SimilarStories storyType={data?.storyType} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
