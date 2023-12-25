import Hero from "@/components/Hero";
import ContinueWatching from "./ContinueWatching";
import NewReleases from "./NewReleases";

export default function Home() {
  return (
    <main className=''>
      <Hero />
      <ContinueWatching />
      <NewReleases />
    </main>
  );
}
