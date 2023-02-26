import React from "react";
import { Spin } from "antd";

interface LoaderProps {
  fullPage?: boolean;
}

const Loader = ({ fullPage }: LoaderProps) => {
  if (fullPage) {
    return (
      <div className="h-screen w-full dark:bg-primary-dark-500 flex justify-center items-center">
        <Spin tip="Wait for a moment.." />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full h-96 items-center justify-center lg:mx-auto lg:h-96 lg:w-96">
      <Spin tip="Wait for a moment.." />
    </div>
  );
};

export default Loader;
