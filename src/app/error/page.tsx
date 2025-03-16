"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") ?? "Something went wrong!";

  return (
    <div className="flex h-[80vh] gap-2 items-center justify-center flex-col">
      <h1 className="text-4xl font-bold font-mono">Error!</h1>
      <p className="text-xl">{message}</p>

      <Link href="/">
        <button className="text-black bg-white px-2 py-1 rounded mt-4 hover:bg-white/85">
          Go back
        </button>
      </Link>
    </div>
  );
}

export default function Error() {
  return (
    <Suspense fallback={<p className="text-center text-xl">Loading...</p>}>
      <ErrorContent />
    </Suspense>
  );
}
