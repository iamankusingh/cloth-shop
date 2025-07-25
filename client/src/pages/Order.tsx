import { SignInButton } from "@clerk/clerk-react";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import useClothConfigStore from "../store/clothConfigStore";

interface updateApiResponse {
  success: boolean;
  message: string;
}

interface fetchUserDataResponse {
  success: boolean;
  message: string;
  data: {
    uid: string;
    fullName: string;
    houseNo: string;
    locality: string;
    city: string;
    pincode: number;
    district: string;
    phoneNo: number;
  };
}

// interface fetchClothConfigResponse {}

const Order: React.FC = () => {
  // variables to store form data
  const [fullName, setFullName] = useState<string>("");
  const [houseNo, setHouseNo] = useState<string>("");
  const [locality, setLocality] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [pincode, setPincode] = useState<number>(0);
  const [district, setDistrict] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<number>(0);

  // from clerk
  const { isLoaded, isSignedIn, userId } = useAuth();

  // to store userId
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    setUid(userId || "");
  }, [setUid, userId]);

  // cloth configuration from zustand
  const {
    hexColor,
    logo,
    logoPath,
    logoSize,
    logoPositionY,
    clothText,
    clothTextColor,
    clothTextSize,
    clothTextPositionY,
    design,
    designPath,
    designScale,
    clothSize,
    updateClothSize,
    clothFabric,
    updateClothFabric,
  } = useClothConfigStore();

  const clothSizesPallate: Array<string> = ["XS", "S", "M", "L", "XL", "XXL"];

  const clothFabricPallate: Array<string> = [
    "Cotton",
    "Silk",
    "Polyester",
    "Wool",
    "Lenin",
    "Khakhi",
  ];

  // ftech user data from database (everytime)
  const fetchUserData = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        `http://localhost:3000/api/v1/user?uid=${uid}`,
        {
          method: "GET",
          headers: {
            "Content-type": "Application/json",
          },
        }
      );

      if (response.ok) {
        const result: fetchUserDataResponse = await response.json();
        console.log("fetch user data by default", result.message);
        alert(result.message);

        setFullName(result.data.fullName);
        setHouseNo(result.data.houseNo);
        setLocality(result.data.locality);
        setCity(result.data.city);
        setPincode(result.data.pincode);
        setDistrict(result.data.district);
        setPhoneNo(result.data.phoneNo);
      }
    } catch (error) {
      console.error("Unable to fetch user data by default", error);
      alert("Unable to fetch user data");
    }
  };

  // create or update
  const handleUser = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        `http://localhost:3000/api/v1/user?uid=${uid}`,
        {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            fullName,
            houseNo,
            locality,
            city,
            pincode,
            district,
            phoneNo,
          }),
        }
      );

      if (response.ok) {
        const result: updateApiResponse = await response.json();
        console.log(result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error("Something went wrong", error);
      alert("Something went wrong");
    }
  };

  // update or reset cloth configuration api call
  const updateClothConfig = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/cloth-config?uid=${uid}`,
        {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            hexColor,
            logo,
            logoPath,
            logoSize,
            logoPositionY,
            clothText,
            clothTextColor,
            clothTextSize,
            clothTextPositionY,
            design,
            designPath,
            designScale,
          }),
        }
      );

      if (response.ok) {
        const result: updateApiResponse = await response.json();
        console.log(result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // handle form and call handleUser
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(fullName, houseNo, locality, city, pincode, district, phoneNo);
    handleUser();
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchUserData();
      updateClothConfig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, isSignedIn]);

  const handleClothSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    updateClothSize(e.target.value);
  };

  const handleClothFabricChnage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateClothFabric(e.target.value);
  };

  return (
    <>
      <PageTitle title="Cloth shop - Order cloth" />

      <main>
        {!isLoaded ? <p>Loading...</p> : null}

        {isSignedIn ? (
          <section className="lg:pt-16 p-3 lg:w-[50vw] rounded-lg">
            <h3 className="text-2xl">Order your Personalized cloth</h3>

            <p className="py-3 text-3xl font-bold">Delivery address</p>

            <form
              className="p-4 grid gric-cols-1 md:grid-cols-2 content-start gap-4 bg-gray-800 rounded-xl text-xl"
              onSubmit={handleFormSubmit}
            >
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
                  required
                  className="input"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="locality">Locality</label>
                <input
                  type="text"
                  id="locality"
                  name="locality"
                  required
                  className="input"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className="input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="number"
                  id="pincode"
                  name="pincode"
                  required
                  minLength={6}
                  maxLength={6}
                  className="input"
                  value={pincode}
                  onChange={(e) => setPincode(parseInt(e.target.value))}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  required
                  className="input"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="phoneNo">Phone No</label>
                <input
                  type="number"
                  id="phoneNo"
                  name="phoneNo"
                  required
                  minLength={10}
                  maxLength={12}
                  className="input"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(parseInt(e.target.value))}
                />
              </div>

              <div className="my-auto text-center">
                <input
                  type="reset"
                  value="Clear all"
                  className="h-fit w-fit mx-2 button"
                />

                <input
                  type="submit"
                  value="Save"
                  className="h-fit w-fit mx-2 button"
                />
              </div>
            </form>

            <div className="py-4 flex justify-between gap-2">
              <div className="relative inline-block w-full text-gray-700">
                <select
                  required
                  className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={clothSize}
                  onChange={handleClothSizeChange}
                >
                  <option value="" selected disabled>
                    Select Size
                  </option>
                  {clothSizesPallate.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15 8.707l-1.414-1.414L10 10.586 6.414 7.001 5 8.415l4.293 4.535z" />
                  </svg>
                </div>
              </div>

              <div className="relative inline-block w-full text-gray-700">
                <select
                  required
                  className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={clothFabric}
                  onChange={handleClothFabricChnage}
                >
                  <option value="" selected disabled>
                    Select Size
                  </option>
                  {clothFabricPallate.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15 8.707l-1.414-1.414L10 10.586 6.414 7.001 5 8.415l4.293 4.535z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <button className="button" onClick={() => updateClothConfig()}>
                Update
              </button>
            </div>
          </section>
        ) : (
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
        )}
      </main>
    </>
  );
};

export default Order;
