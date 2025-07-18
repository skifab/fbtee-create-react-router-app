import type { Route } from "./+types/about";
import { fbs } from "fbtee";
import { Suspense } from "react";
import { AboutSection } from "~/about-section/about-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: fbs("New React Router App", "meta title") },
    { name: "description", content: fbs("Welcome to React Router!", "meta description") },
  ];
}

export function loader() {

  const criticalData = fbs("This is critical data", "about section critical data").toString();
  const slowData = fbs("This is slow data", "about section slow data").toString();

  const slowDataPromise = new Promise<string>((resolve) => {
    setTimeout(() => {
      console.log("Slow data resolved");
      resolve(slowData);
    }, 2000);
  });

  return { criticalData, slowDataPromise };
}

function Skeleton() {
  return <p><fbt desc="Loading skeleton">Loading...</fbt></p>;
}

export default function About({ loaderData }: Route.ComponentProps) {

  const { slowDataPromise, criticalData } = loaderData

  return (
      <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <p>{criticalData}</p>
          <Suspense fallback={<Skeleton />}>
            <AboutSection  slowDataPromise={slowDataPromise} />
          </Suspense>
        </header>
      </div>
    </main>
  )
;
}
