"use client";
import { usePathname } from "next/navigation";

export default function RouteTitle() {
  const pathname = usePathname();
  const route = pathname.slice(1) || "home";
  return (
    <h1 style={{ fontFamily: "var(--font-montserrat)" }} className="text-3xl">
      {route}
    </h1>
  );
}
