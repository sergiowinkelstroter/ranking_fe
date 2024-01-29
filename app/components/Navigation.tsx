"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="absolute left-4 top-20 flex j">
      <span className="inline-flex -space-x-px overflow-hidden rounded-md border  bg-[#141a3b] shadow-sm">
        <Link
          href="/"
          className={`inline-block px-4 py-2  text-sm font-medium ${
            pathname === "/"
              ? "bg-[#141a3b] text-white"
              : "bg-white text-[#141a3b]"
          }  hover:opacity-85 focus:relative`}
        >
          Classificação
        </Link>

        <Link
          href="/eventos"
          className={`inline-block px-4 py-2  text-sm font-medium ${
            pathname === "/eventos"
              ? "bg-[#141a3b] text-white"
              : "bg-white text-[#141a3b]"
          }  hover:opacity-85 focus:relative`}
        >
          Eventos
        </Link>
      </span>
    </div>
  );
};