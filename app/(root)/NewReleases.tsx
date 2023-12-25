import MovieCard from "@/components/MovieCard";
import React from "react";

const NewReleases = () => {
  return (
    <div className='ml-[5rem] mt-10'>
      <h1 className='text-xl underline mb-2'>New Releases</h1>
      <div className='flex flex-col md:flex-row w-full gap-7 overflow-x-scroll remove-scroll'>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
};

export default NewReleases;
