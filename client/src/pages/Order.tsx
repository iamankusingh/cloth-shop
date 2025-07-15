import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";

interface formDataInterface {
  uid: string;
  fullName: string;
}

const Order: React.FC = () => {
  // variables to store form data
  const [uid, setUid] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    setUid("anku1109");
  }, []);

  // form data object
  const formData: formDataInterface = {
    uid: uid,
    fullName: fullName,
  };

  // handle form
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    updateUser();
  };

  const updateUser = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        "http://localhost:3000/api/v1/user",
        {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("User updated successfullt", result);
        alert("User updated successfully");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      alert("Failed to update user");
    }
  };

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
          <section className="lg:pt-16 p-3 lg:w-[50vw] rounded-lg">
            <h3 className="text-2xl">Order your Personalized cloth</h3>

            <p className="py-3 text-3xl font-bold">Delivery address</p>

            <form
              className="p-4 grid gric-cols-1 md:grid-cols-2 content-start gap-4 bg-gray-800 rounded-xl text-xl"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                name="uid"
                id="uid"
                readOnly
                className="hidden"
                value={uid}
              />
              <div className="inputBox">
                <label htmlFor="name">Full name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="houseNo">House No</label>
                <input
                  type="text"
                  id="houseNo"
                  name="houseNo"
                  className="input"
                />
              </div>

              <div className="inputBox">
                <label htmlFor="locality">Locality</label>
                <input
                  type="text"
                  id="locality"
                  name="locality"
                  className="input"
                />
              </div>

              <div className="inputBox">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" className="input" />
              </div>

              <div className="inputBox">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="number"
                  id="pincode"
                  name="pincode"
                  minLength={6}
                  maxLength={6}
                  className="input"
                />
              </div>

              <div className="inputBox">
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  className="input"
                />
              </div>

              <div className="inputBox">
                <label htmlFor="phoneNo">Phone No</label>
                <input
                  type="number"
                  id="phoneNo"
                  name="phoneNo"
                  minLength={10}
                  maxLength={12}
                  className="input"
                />
              </div>

              <div className="my-auto text-center">
                <input
                  type="submit"
                  value="Save"
                  className="h-fit w-fit button"
                />
              </div>
            </form>
          </section>
        </SignedIn>
      </main>
    </>
  );
};

export default Order;
