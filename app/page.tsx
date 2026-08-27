import type { Metadata } from "next";
import Storefront from "./Storefront";

export const metadata: Metadata = {
  title: "NOV8TECH — Pool Equipment",
  description:
    "Shop pool pumps, filters and salt systems, with legacy inventory kept in a separate clearance collection.",
};

export default function Home() {
  return <Storefront />;
}
