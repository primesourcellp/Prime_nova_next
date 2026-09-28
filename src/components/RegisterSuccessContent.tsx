"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Older success links return to the register form, where the popup is shown. */
export function RegisterSuccessContent() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/register?created=1");
  }, [router]);

  return <div className="h-40 animate-pulse rounded-xl bg-surface-soft" />;
}
