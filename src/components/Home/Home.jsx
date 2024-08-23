import React from "react";
import style from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Home() {





  return (
    <>
      <h2 className="mx-auto text-3xl text-center my-10 font-bold border-b-2 pb-2 border-blue-500 w-fit">
        Home
      </h2>
    <RecentProducts/>
    </>
  );
}
