import fetchStories from "@/utils/fetchStories";
import React from "react";
import Image from "next/image";
import { it } from "node:test";
import { Button } from "../ui/button";
import Link from "next/link";

const Stories = async ({ data: commingData, storyFromCollection }: any) => {
  const data = await fetchStories.fetchRealStories();

  return (
    <div className="">
      {!storyFromCollection ? (
        <div className="grid md:grid-cols-3 gap-5 items-center">
          {data.map((item, index) => {
            return (
              <div className="mb-5" key={index}>
                <figure>
                  <Image
                    src={item?.imageUrl}
                    //   src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Shoes"
                    width={120}
                    height={250}
                    className="w-full min-h-[250px] max-h-[250px] object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold  my-3">
                    {item?.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    {item?.content.length > 100
                      ? item?.content.slice(0, 100) + "..."
                      : item?.content}
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      href={`singlestory/${item?.storyID}`}
                      className="mt-3"
                    >
                      <Button className="dark:text-white">
                        <span className="dark:text-white">Read More</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5 items-center">
          {commingData.map((item: any, index: any) => {
            return (
              <div className="mb-5" key={index}>
                <figure>
                  <Image
                    src={item?.imageUrl}
                    //   src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Shoes"
                    width={120}
                    height={250}
                    className="w-full min-h-[250px] max-h-[250px] object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold  my-3">
                    {item?.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    {item?.content.length > 100
                      ? item?.content.slice(0, 100) + "..."
                      : item?.content}
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      href={`/singlestory/${item?.storyID}`}
                      className="mt-3"
                    >
                      <Button className="dark:text-white">
                        <span className="dark:text-white">Read More</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Stories;
