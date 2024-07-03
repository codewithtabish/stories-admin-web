import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import HeroTitle from "./HeroTtitle";

const HeroSection = () => {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <Image
                width={1000}
                height={1000}
                alt="image data"
                src={"/second.svg"}
                // src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>

            <div className="lg:py-24">
              <HeroTitle />

              <p className="mt-4 dark:text-gray-500 text-gray-700 font-outfit font-medium">
                Unlock the key to exponential growth with PracticePro, the
                revolutionary doctor appointment booking app that`s transforming
                the healthcare industry. Designed to streamline your operations
                and expand your patient base, PracticePro is your gateway to
                unparalleled success.
              </p>

              <Button className="dark:text-gray-200 my-2">Explore Now</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
