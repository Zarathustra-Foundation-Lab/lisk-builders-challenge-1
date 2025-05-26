import React from "react";

function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="">
        <div className="border-t-2 border-t-primary rounded-full h-30 w-24 animate-spin"></div>
        <h2 className="font-medium text-2xl text-center text-primary/70 pt-4">
          Loading...
        </h2>
      </div>
    </div>
  );
}

export default Loading;
