"use client";

const Hero = () => {
  const handleScroll = () => {
    console.log("Clicking on the button");
    const element = document.getElementById("contwatch");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className='absolute top-0 left-0 object-cover w-full h-full opacity-50'
      >
        <source src='/video.mp4' type='video/mp4' />
      </video>
      <div className='absolute top-0 left-0 w-full h-full opacity-60'></div>

      <div className='h-screen relative z-10 flex flex-col items-center justify-center text-white'>
        <h1 className='text-4xl font-semibold mb-4'>
          Welcome to Your Streaming Platform
        </h1>
        <p className='text-lg mb-6'>
          Watch your favorite movies and TV shows in high quality.
        </p>
        <button
          onClick={handleScroll}
          className='bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 rounded-full text-lg shadow-lg transition duration-300'
        >
          Start Watching
        </button>
      </div>
    </>
  );
};

export default Hero;
