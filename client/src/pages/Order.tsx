import { SignInButton } from "@clerk/clerk-react";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import useClothConfigStore from "../store/clothConfigStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  useEffect(() => {
    console.log(clothSize, clothFabric);
  }, [clothSize, clothFabric]);

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
        toast.success(result.message, {
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });

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
      toast.error("Unable to fetch user data", {
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
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
        toast.success(result.message, {
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("Something went wrong", {
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
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
            clothSize,
            clothFabric,
          }),
        }
      );

      if (response.ok) {
        const result: updateApiResponse = await response.json();
        console.log(result.message);
        toast.success(result.message, {
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });
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

  // const handleClothSizeChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ): void => {
  //   updateClothSize(e.target.value);
  // };

  // const handleClothFabricChnage = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   updateClothFabric(e.target.value);
  // };

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
              className="p-4 grid gric-cols-1 md:grid-cols-2 content-start gap-4 bg-secondary rounded-xl text-xl"
              onSubmit={handleFormSubmit}
            >
              <div className="inputBox">
                <label htmlFor="name">Full name</label>
                <Input
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
                <Input
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
                <Input
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
                <Input
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
                <Input
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
                <Input
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
                <Input
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

              <div className="flex items-center justify-evenly">
                <Input
                  type="reset"
                  value="Clear all"
                  className="h-fit w-fit mx-2 button"
                />

                <Input
                  type="submit"
                  value="Save"
                  className="h-fit w-fit mx-2 button"
                />
              </div>
            </form>

            <div className="py-4 flex justify-evenly gap-2">
              <Select
                value={clothSize}
                onValueChange={(value) => {
                  updateClothSize(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {clothSizesPallate.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={clothFabric}
                onValueChange={(value) => {
                  updateClothFabric(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Fabric" />
                </SelectTrigger>

                <SelectContent>
                  {clothFabricPallate.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={() => updateClothConfig()}>Update</Button>
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

            <SignInButton />
          </section>
        )}
      </main>
    </>
  );
};

export default Order;
