// header of application

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { ModeToggle } from "./mode-toggle";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  return (
    <header className="w-full px-4 lg:px-20 py-2 flex justify-between items-center text-2xl font-semibold bg-[#f5f5f5] dark:bg-[#f5f5f515] shadow fixed top-0 z-10">
      <NavLink to="/">Cloth Shop</NavLink>

      <div className="flex items-center gap-2 lg:gap-4">
        <ModeToggle />

        <SignedOut>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
