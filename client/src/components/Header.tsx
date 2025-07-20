// header of application

import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { useEffect } from "react";
import useClothConfigStore from "../store/clothConfigStore";

const Header: React.FC = () => {
  const { updateUid } = useClothConfigStore();

  // from clerk
  const { isSignedIn, userId } = useAuth();

  // update uid when user signs in
  useEffect(() => {
    if (isSignedIn) {
      updateUid(userId || "");
    } else {
      updateUid("");
    }
  }, [isSignedIn, updateUid, userId]);

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
