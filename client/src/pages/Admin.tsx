import PageTitle from "@/components/PageTitle";
import useUserStore from "@/store/userStore";
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useClothConfigStore from "@/store/clothConfigStore";
import useCanvasStore from "@/store/canvasStore";

interface User {
  createdAt: string;
  uid: string;
  fullName: string;
  houseNo: number;
  locality: string;
  city: string;
  district: string;
  pincode: number;
  phoneNo: number;
}

interface order {
  createdAt: string;
  uid: string;
  hexColor: string;
  logo?: string;
  logoPath?: string;
  logoSize?: number;
  logoPositionX?: number;
  logoPositionY?: number;
  logoUrl?: string;
  clothText?: string;
  clothFont?: string;
  clothTextColor?: string;
  clothTextSize?: number;
  clothTextPositionX?: number;
  clothTextPositionY?: number;
  design?: string;
  designPath?: string;
  designScale?: number;
  clothSize?: string;
  clothFabric?: string;
  price?: number;
}

const Admin: React.FC = () => {
  // from clerk
  const { isSignedIn, userId, getToken } = useAuth();

  // user zustand store
  const { updateIsSignedIn, updateUid } = useUserStore();

  // cloth config zustand store
  const {
    updateHexColor,
    updateLogo,
    updateLogoPath,
    updateLogoSize,
    updateLogoPositionX,
    updateLogoPositionY,
    updateLogoUrl,
    updateClothText,
    updateClothFont,
    updateClothTextColor,
    updateClothTextSize,
    updateClothTextPositionX,
    updateClothTextPositionY,
    updateDesign,
    updateDesignPath,
    updateDesignScale,
    updateClothSize,
    updateClothFabric,
  } = useClothConfigStore();

  const { updateShow } = useCanvasStore();

  const navigate = useNavigate();

  const [allUsersList, setAllUsersList] = useState<[]>([]);
  const [allOrderList, setAllOrderList] = useState<[]>([]);

  const verifyAdmin = async (): Promise<void> => {
    console.log("Verifying admin...", userId);

    try {
      const response = await fetch("http://localhost:3000/api/v1/admin", {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (response) {
        const result = await response.json();
        if (!result.success) {
          navigate("/");
        }
        console.log(result);
        toast.success(result.message, {
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });
      }
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  const fetchAllUsers = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/admin/getAllUsers",
        {
          method: "GET",
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (response) {
        const result = await response.json();
        console.log("Fetched all users data ", result);
        setAllUsersList(result.data);
        toast.success(result.message, {
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch users data", {
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    }
  };

  const fetchAllOrders = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/admin/getAllOrders",
        {
          method: "GET",
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (response) {
        const result = await response.json();
        console.log("Fetched all orders data ", result);
        setAllOrderList(result.data);
        toast.success(result.message, {
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch orders data", {
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    }
  };

  const refreshDashboard = (): void => {
    fetchAllUsers();
    fetchAllOrders();
  };

  const fetchClothConfig = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        `http://localhost:3000/api/v1/cloth-config?uid=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("fetch cloth config data ", result);
        toast.success(result.message, {
          // description: "Just fetched your cloth config data from dtabase",
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });

        // update zustand store with fetched data
        updateHexColor(result.data.hexColor);
        updateLogo(result.data.logo);
        updateLogoPath(result.data.logoPath);
        updateLogoSize(result.data.logoSize);
        updateLogoPositionX(result.data.logoPositionX);
        updateLogoPositionY(result.data.logoPositionY);
        updateLogoUrl(result.data.logoUrl);
        updateClothText(result.data.clothText);
        updateClothFont(result.data.clothFont);
        updateClothTextColor(result.data.clothTextColor);
        updateClothTextSize(result.data.clothTextSize);
        updateClothTextPositionX(result.data.clothTextPositionX);
        updateClothTextPositionY(result.data.clothTextPositionY);
        updateDesign(result.data.design);
        updateDesignPath(result.data.designPath);
        updateDesignScale(result.data.designScale);
        updateClothSize(result.data.clothSize);
        updateClothFabric(result.data.clothFabric);
      }
    } catch (error) {
      console.error("Unable to fetch cloth config data by default", error);
      toast.error("Unable to fetch cloth config data", {
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    }
  };

  const previewCloth = (uid: string): void => {
    updateUid(uid);
    fetchClothConfig();
    updateShow(true);
  };

  useEffect(() => {
    updateShow(false);

    if (isSignedIn === undefined) return;

    if (isSignedIn) {
      updateIsSignedIn(true);
      updateUid(userId || "");
      console.log("Someone has signed in, verifying for admin");

      verifyAdmin();
      fetchAllUsers();
      fetchAllOrders();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return (
    <>
      <PageTitle title="Cloth shop - Home" />

      <main className="min-h-[50vh] lg:min-h-screen w-screen lg:min-w-[50vw]">
        {isSignedIn ? (
          <section className="px-2">
            <div className="pt-12 pb-1 flex items-center justify-between">
              <h2 className="">Welcome Admin</h2>

              <Button variant="outline" onClick={() => refreshDashboard()}>
                Refresh
              </Button>
            </div>

            <Tabs defaultValue="allUsers" className="z-1000">
              <TabsList className="w-full">
                <TabsTrigger value="allUsers" onClick={() => updateShow(false)}>
                  All Users
                </TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="processing">Prossesing</TabsTrigger>
              </TabsList>

              <TabsContent value="allUsers">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {allUsersList.map((user: User, idx: number) => (
                    <Card key={idx} className="mb-4">
                      <CardHeader>
                        <CardTitle>{user.fullName}</CardTitle>

                        <CardDescription>
                          <p>{user.uid}</p>
                          <p>{user.createdAt}</p>
                        </CardDescription>

                        <CardAction>
                          <Button variant="destructive">Delete User</Button>
                        </CardAction>
                      </CardHeader>

                      <CardContent>
                        <p>{`${user.houseNo}, ${user.locality}, ${user.city}, ${user.district} - ${user.pincode}`}</p>
                        <p className="mt-2">{user.phoneNo}</p>
                      </CardContent>

                      <CardFooter className="flex-col gap-2">
                        <Button variant="outline">All Orders</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {allOrderList.map((order: order, idx: number) => (
                    <Card key={idx} className="mb-4">
                      <CardHeader>
                        <CardTitle>Ballu</CardTitle>

                        <CardDescription>
                          <p>{order.uid}</p>
                          <p>{order.createdAt}</p>
                        </CardDescription>

                        <CardAction>
                          <Button variant="destructive">Reject order</Button>
                        </CardAction>
                      </CardHeader>

                      <CardContent className="flex items-center gap-2">
                        <div
                          className="w-10 h-10 rounded-full"
                          style={{ backgroundColor: order.hexColor }}
                        ></div>

                        <p>{order.logo}</p>
                        <p>{order.clothText}</p>
                        <p>{order.design}</p>
                      </CardContent>

                      <CardFooter className="flex justify-center gap-2">
                        <Button variant="outline">
                          Mark as start Producing
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => previewCloth(order.uid)}
                        >
                          Preview
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="processing">
                <div>Orders in processing</div>
              </TabsContent>
            </Tabs>
          </section>
        ) : (
          <section className="p-2">
            <div className="pt-12">
              <h2>Loading...</h2>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Admin;
