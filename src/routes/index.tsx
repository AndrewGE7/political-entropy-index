import { createFileRoute } from "@tanstack/react-router";
import { PeiApp } from "@/components/pei/pei-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <PeiApp />;
}
