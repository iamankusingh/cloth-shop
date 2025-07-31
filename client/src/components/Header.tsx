// header of application

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { ModeToggle } from "./mode-toggle";

const Header: React.FC = () => {
  return (
    <header className="w-screen p-1 flex justify-between items-center text-2xl font-semibold bg-secondary fixed top-0 z-10">
      <h1>Cloth SHop</h1>

      <div className="flex items-center gap-2">
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
