"use client"
import React, { SyntheticEvent } from "react";
import HealthTopic from "./HealthTopic";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const tabs = ["Home", "Health Topic", "Resources", "About Us", "Contact"];
  const cardData = [
    {
      title: "COVID-19",
      description:
        "stay informed about the latest covid-19 guidelines and vaccination information",
    },
    {
      title: "Heart Health",
      description:
        "stay informed about the latest covid-19 guidelines and vaccination information",
    },
    {
      title: "Mental welness",
      description:
        "stay informed about the latest covid-19 guidelines and vaccination information",
    },
  ];
  const handleRouting = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { name } = e?.target as HTMLButtonElement;
    router?.push(`/${name}`);
  };
  return (
    <div className="w-full h-full">

      <div className="min-w-full min-h-[300px] bg-primary">
        <button
          name="login"
          onClick={handleRouting}
          className="border border-white px-2 py-1 bg-secondary  rounded-sm absolute top-4 right-10 text-white"
        >
          Login
        </button>
        <h1 className="text-white font-bold text-[24px] flex justify-center pt-6">
          Bayer Healthcare
        </h1>
        <div className="min-w-full min-h-[35px] bg-secondary mt-8 flex justify-center items-center gap-6 ">
          {tabs?.map((item: string) => (
            <p className="w-auto font-bold text-white" key={item}>
              {item}
            </p>
          ))}
        </div>
        <div className="flex flex-col justify-center mt-12 w-full">
          <h1 className="text-white flex justify-center text-[30px] font-bold">
            Your Health, Our Priority
          </h1>
          <p className="flex justify-center text-white">
            Explore the latest health information and resources from Bayer
            Healthcare
          </p>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-bold mx-6 text-[22px]">Featured Health Topics</h2>
        <div className="flex mx-4">
          {cardData?.map((data) => (
            <HealthTopic {...data} key={data?.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
