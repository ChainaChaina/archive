"use client";
import { usePathname } from "next/navigation";

export default function RouteTitle() {
  const pathname = usePathname();
const route = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2) || "Home";
  return (
    <h1 style={{ fontFamily: "var(--font-montserrat)" }} className="text-3xl">
      {route}
    </h1>
  );
}
