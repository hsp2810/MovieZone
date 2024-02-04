import Hero from "@/components/Hero";
import NewReleases from "../NewReleases";
import { cookies } from "next/headers";
import { Authenticate } from "@/lib/server/Authenticate";

const Home = async () => {
  const cookie = cookies().get("authToken")?.value;
  let user = null;
  if (cookie) {
    user = await Authenticate(cookie);
  }

  return (
    <main>
      <section>
        <h1 className='text-lg ml-6 my-3'>Welcome back, {user?.name}</h1>
      </section>
      <NewReleases />
    </main>
  );
};

export default Home;
