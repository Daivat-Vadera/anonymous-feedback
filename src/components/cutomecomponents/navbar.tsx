"use client";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";
const handleSignOut = () => {
  signOut();
};
function NavBar() {
  const { data: Session, status } = useSession();
  if (status == "loading") {
    return <></>;
  }

  const user: User = Session?.user as User;
  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Anonymous Feedback
        </a>
        {Session ? (
          <>
            <span className="mr-4">Welcome, {user.username}</span>
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
              onClick={handleSignOut}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <div>
              <Link href="/sign-in" className="px-3">
                <Button
                  className="w-full md:w-auto bg-slate-100 text-black "
                  variant={"outline"}
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up" className="px-3">
                <Button
                  className="w-full md:w-auto bg-slate-100 text-black"
                  variant={"outline"}
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
