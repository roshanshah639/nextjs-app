import React from "react";

const userProfile = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl">
        Profile of{" "}
        <span className="font-bold bg-orange-500 p-2 text-white rounded-md">
          {params.id}
        </span>{" "}
      </h1>
    </div>
  );
};

export default userProfile;
