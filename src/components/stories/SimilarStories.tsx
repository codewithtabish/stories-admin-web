import fetchStories from "@/utils/fetchStories";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SimilarStories = async ({ storyType }: { storyType: string }) => {
  const data = await fetchStories.fetchRealStoriesOfCategory(storyType);
  console.log(data);

  return (
    <div className=" mt-20 flex justify-center items-center mx-auto">
      <div className="flex flex-col gap-3 justify-center items-center mx-auto ">
        {data.map((item, index) => {
          return (
            <Link
              key={index}
              href={`/singlestory/${item?.storyID}`}
              className=" border-b-[1px] dark:border-gray-600
            border-gray-300 w-[90%] p-3 rounded-md"
            >
              <Image
                className="w-[90%] h-20 object-cover rounded-md"
                src={item.imageUrl}
                alt=""
                width={70}
                height={60}
              />
              <h3 className="font-semibold py-1 mt-[1px] text-sm text-center max-w-[90%]">
                {item?.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarStories;
