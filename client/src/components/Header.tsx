// header of application

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header: React.FC = () => {
  return (
    <header className="w-screen p-2 flex justify-between text-2xl text-white font-semibold bg-blue-600 fixed top-0 z-10">
      <div>
        <h1>Cloth SHop</h1>
      </div>

      <div>
        <SignedOut>
          <div className="button">
            <SignInButton />
          </div>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
