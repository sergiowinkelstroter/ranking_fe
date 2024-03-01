"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PageAdmin() {
  const router = useRouter();

  useEffect(() => {
    router.push("/adm/login");
  }, []);

  return null;
}
