import React from "react";

const HealthTopic = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2 jobCard">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-300">
        <div className="px-4 py-4 jobCardText">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-2">{description}</p>
        </div>
        <div className="mx-4 my-5">
          <button className="bg-secondary px-2 py-1 text-white">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthTopic;
