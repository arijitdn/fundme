"use client";

import signout from "@/actions/signout";

export const LogoutButton = () => {
  return (
    <button
      onClick={async () => await signout()}
      className="rounded bg-white py-2 px-4 text-black hover:bg-white/85"
    >
      Logout
    </button>
  );
};
