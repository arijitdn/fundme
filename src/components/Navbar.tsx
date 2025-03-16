import Link from "next/link";
import Image from "next/image";
import navLinks from "@/lib/navLinks";
import FundMeImage from "@/assets/FundMe.svg";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./LogoutButton";

export const Navbar = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <nav className="h-[10vh] w-full shadow-xl">
      <div className="flex items-center justify-between mx-6">
        <Link href="/" className="select-none">
          <Image src={FundMeImage} alt="" height={75} />
        </Link>
        <ul className="flex gap-10">
          {data.user ? (
            <span className="flex gap-10">
              {navLinks.map((link, i) => (
                <li key={i} className="hover:text-white/80">
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </span>
          ) : (
            <span className="flex gap-10">
              {navLinks
                .filter((links) => links.auth === false)
                .map((link, i) => (
                  <li key={i} className="hover:text-white/80">
                    <Link href={link.url}>{link.title}</Link>
                  </li>
                ))}
            </span>
          )}
        </ul>
        {!data.user ? (
          <Link href="/auth/login">
            <button className="rounded bg-white py-2 px-4 text-black hover:bg-white/85">
              Login
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <p>{data.user.email}</p>
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
};
