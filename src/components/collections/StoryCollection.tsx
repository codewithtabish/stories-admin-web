import fetchStories from "@/utils/fetchStories";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StoryCollection = async () => {
  const data = await fetchStories.fetchStories();
  console.log(data);

  return (
    <div className="">
      <div className="flex flex-col gap-4 ">
        {data.map((item, index) => {
          return (
            <Link
              href={`/collection/${item?.storyType}`}
              key={index}
              className="flex flex-row gap-4 items-center bg-gray-300 dark:bg-gray-700 cursor-pointer w-[90%] p-3 rounded-md"
            >
              <Image
                src={item?.imageUrl}
                alt="story collection image"
                className="w-8 h-8 object-cover"
                width={60}
                height={60}
              />
              <h3 className="">{item?.storyType}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default StoryCollection;
