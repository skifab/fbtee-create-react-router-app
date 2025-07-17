import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { fbs } from "fbtee";

export function meta({}: Route.MetaArgs) {
  return [
    { title: fbs("New React Router App", "meta title") },
    { name: "description", content: fbs("Welcome to React Router!", "meta description") },
  ];
}

export default function Home() {
  return <Welcome />;
}
