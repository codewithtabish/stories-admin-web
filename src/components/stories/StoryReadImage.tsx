import Image from "next/image";
import React from "react";

const StoryReadImage = ({ storyImage }: { storyImage: string }) => {
  return (
    <div className="flex justify-center">
      <Image
        src={storyImage}
        alt="single story image"
        width={300}
        height={400}
        className="object-cover w-full min-h-[400px] max-h-[400px]"
      />
    </div>
  );
};

export default StoryReadImage;
