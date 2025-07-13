import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import PageTitle from "../components/PageTitle";

const Order: React.FC = () => {
  return (
    <>
      <PageTitle title="Cloth shop - Order cloth" />

      <main>
        <SignedOut>
          <section className="lg:h-screen lg:w-[50vw] lg:pt-16 p-2 flex flex-col items-center justify-center gap-6">
            <h3 className="text-2xl">Please Sign in first to order.</h3>

            <img
              src="/hello-user.gif"
              alt="hello user"
              className="rounded-full"
            />

            <div className="button">
              <SignInButton />
            </div>
          </section>
        </SignedOut>

        <SignedIn>
          {/* <UserButton /> */}
          <section className="lg:pt-16 p-2 lg:w-[50vw] border-2 border-blue-600 rounded-lg text-center">
            <h3 className="text-2xl">Order your Personalized cloth</h3>

            <form action="#" className="flex flex-col gap-1">
              <p>Enter your address</p>

              <label htmlFor="name">Full name: </label>
              <input type="text" id="name" name="name" />

              <label htmlFor="houseNo">House No: </label>
              <input type="text" id="houseNo" name="houseNo" />

              <label htmlFor="locality">Locality: </label>
              <input type="text" id="locality" name="locality" />

              <label htmlFor="city">City: </label>
              <input type="text" id="city" name="city" />

              <label htmlFor="pincode">Pincode: </label>
              <input type="number" id="pincode" name="pincode" />

              <label htmlFor="district">District: </label>
              <input type="text" id="district" name="district" />

              <input type="submit" value="Save" />
            </form>
          </section>
        </SignedIn>
      </main>
    </>
  );
};

export default Order;
