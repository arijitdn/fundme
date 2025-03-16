import Link from "next/link";

export default function Error({
  searchParams,
}: {
  searchParams: {
    message: string;
  };
}) {
  return (
    <div className="flex h-[80vh] gap-2 items-center justify-center flex-col">
      <h1 className="text-4xl font-bold font-mono">Error!</h1>
      <p className="text-xl">
        {searchParams.message ?? "Something went wrong!"}
      </p>

      <Link href="/">
        <button className="text-black bg-white px-2 py-1 rounded mt-4 hover:bg-white/85">
          Go back
        </button>
      </Link>
    </div>
  );
}
