// header of application

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header: React.FC = () => {
  return (
    <header className="w-screen p-1 flex justify-between items-center text-2xl font-semibold bg-primary fixed top-0 z-10">
      <h1>Cloth SHop</h1>

      <SignedOut>
        <div className="button">
          <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
