import { Heart, HeartOffIcon, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import SpeakIcon from "./SpeakIcon";
import StoryLikes from "./StoryLike";

const SingleStory = ({ storyData }: any) => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-3xl font-semibold py-3">{storyData?.title}</h2>
        <div className="flex flex-row-reverse gap-3 items-center">
          <StoryLikes users={storyData?.users} story={storyData} />

          {/* <SpeakIcon 
          data={storyData?.content}/> */}
        </div>
      </div>
      <p
        className=" leading-[40px] max-w-[90%]  font-mono py-4

      dark:text-gray-400 "
      >
        {storyData.content}
      </p>
    </div>
  );
};

export default SingleStory;
