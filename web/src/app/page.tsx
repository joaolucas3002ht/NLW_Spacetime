import { Blur } from "./components/Blur";
import { Stripes } from "./components/Stripes";
import { EmptyMemories } from "./components/EmptyMemories";
import { SignIn } from "./components/SignIn";
import { Copyright } from "./components/Copyright";
import { Hero } from "./components/Hero";
import { Profile } from "./components/Profile";
import { cookies } from "next/headers";

export default function Home() {
  const isAuthenticated = cookies().has("token");

  return (
    <main className="grid h-full min-h-screen grid-cols-2 bg-[url(./assets/bg-stars.svg)] ">
      <section className="relative flex flex-col items-start justify-between overflow-hidden border-r px-[min(8vw,120px)] py-16">
        <Blur />
        <Stripes />
        {isAuthenticated ? <Profile /> : <SignIn />}
        <Hero />
        <Copyright />
      </section>

      <section className={"flex flex-col bg-[url(./assets/bg-stars.svg)] p-16"}>
        <EmptyMemories />
      </section>
    </main>
  );
}
