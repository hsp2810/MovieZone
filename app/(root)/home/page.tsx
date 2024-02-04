import Hero from "@/components/Hero";
import NewReleases from "../NewReleases";

const Home = async () => {
  return (
    <main>
      <section>
        <h1 className='text-lg ml-6 my-3'>Hello, Name</h1>
      </section>
      <NewReleases />
    </main>
  );
};

export default Home;
