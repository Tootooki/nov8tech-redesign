import type { Metadata } from "next";
import Storefront from "./Storefront";

export const metadata: Metadata = {
  title: "NOV8TECH — Pool Equipment & Everyday Tech",
  description:
    "Shop pool pumps, filters, salt systems, open-box equipment and NOV8TECH accessories.",
};

export default function Home() {
  return <Storefront />;
}
