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
import { Spinner } from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  _id: string;
  fullName: string;
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
  quantity?: number;
  price?: number;
  status: string;
}

const Admin: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // from clerk
  const { isSignedIn, userId, getToken } = useAuth();

  // user zustand store
  const { updateIsSignedIn, uid, updateUid } = useUserStore();

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
    updateQuantity,
    updatePrice,
  } = useClothConfigStore();

  const { updateShow } = useCanvasStore();

  const navigate = useNavigate();

  const [allUsersList, setAllUsersList] = useState<[]>([]);
  const [allOrderList, setAllOrderList] = useState<[]>([]);

  const verifyAdmin = async (): Promise<void> => {
    console.log("Verifying admin...", userId);

    try {
      const response = await fetch(`${apiUrl}/api/v1/admin`, {
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
      const response = await fetch(`${apiUrl}/api/v1/admin/getAllUsers`, {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });

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
      const response = await fetch(`${apiUrl}/api/v1/admin/getAllOrders`, {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });

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

  const fetchClothConfig = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        `${apiUrl}/api/v1/cloth-config?uid=${uid}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        },
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
        updateQuantity(result.data.quantity);
        updatePrice(result.data.price);
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

  const previewCloth = (order: order): void => {
    updateUid(uid);
    // fetchClothConfig();
    // updateShow(true);

    // update zustand store with fetched data
    updateHexColor(order.hexColor);
    updateLogo(order.logo || "");
    updateLogoPath(order.logoPath || "");
    updateLogoSize(order.logoSize || 0);
    updateLogoPositionX(order.logoPositionX || 0);
    updateLogoPositionY(order.logoPositionY || 0);
    updateLogoUrl(order.logoUrl || "");
    updateClothText(order.clothText || "");
    updateClothFont(order.clothFont || "");
    updateClothTextColor(order.clothTextColor || "#ffffff");
    updateClothTextSize(order.clothTextSize || 0);
    updateClothTextPositionX(order.clothTextPositionX || 0);
    updateClothTextPositionY(order.clothTextPositionY || 0);
    updateDesign(order.design || "");
    updateDesignPath(order.designPath || "");
    updateDesignScale(order.designScale || 1);
    updateClothSize(order.clothSize || "");
    updateClothFabric(order.clothFabric || "");
  };

  const refreshDashboard = (): void => {
    fetchAllUsers();
    fetchAllOrders();
    fetchClothConfig();
  };

  const updateStatus = async (_id: string, status: string) => {
    console.log(_id, status);
    try {
      const response: Response = await fetch(
        `${apiUrl}/api/v1/admin/updateOrderStatus`,
        {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({ _id, status }),
        },
      );

      if (response) {
        const result = await response.json();
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
      toast.error("Unable to update orders status", {
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    }
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
      fetchClothConfig();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return (
    <>
      <PageTitle title="Cloth shop - Admin" />

      <main className="min-h-[50dvh] lg:min-h-screen w-screen lg:min-w-[50vw]">
        {isSignedIn ? (
          <section className="px-2 pt-14 pb-1">
            <Tabs defaultValue="overview">
              <TabsList className="w-full z-100">
                <TabsTrigger
                  value="overview"
                  onClick={() => {
                    updateShow(false);
                  }}
                >
                  Overview
                </TabsTrigger>

                <TabsTrigger
                  value="allUsers"
                  onClick={() => {
                    updateShow(false);
                  }}
                >
                  All Users
                </TabsTrigger>

                <TabsTrigger
                  value="orders"
                  onClick={() => {
                    updateShow(true);
                  }}
                >
                  Orders
                </TabsTrigger>

                <TabsTrigger
                  value="processing"
                  onClick={() => {
                    updateShow(true);
                  }}
                >
                  Processing
                </TabsTrigger>

                <TabsTrigger
                  value="delivering"
                  onClick={() => {
                    updateShow(false);
                  }}
                >
                  Delivering
                </TabsTrigger>

                <TabsTrigger
                  value="delivered"
                  onClick={() => {
                    updateShow(false);
                  }}
                >
                  Delivered
                </TabsTrigger>

                <TabsTrigger
                  value="finance"
                  onClick={() => {
                    updateShow(false);
                  }}
                >
                  Finance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Welcome Admin</h2>

                  <Button variant="outline" onClick={() => refreshDashboard()}>
                    Refresh
                  </Button>
                </div>
              </TabsContent>

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
                          <Button variant="destructive">Ban User</Button>
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
                <ScrollArea className="lg:h-[80dvh] md:w-[50dvw] grid grid-cols-1 rounded-2xl">
                  {allOrderList.map((order: order, idx: number) => (
                    <Card key={idx} className="mb-4">
                      <CardHeader>
                        <CardTitle>{order.fullName}</CardTitle>

                        <CardDescription>
                          <p>{order.uid}</p>
                          <p>{order._id}</p>
                          <p>{order.createdAt}</p>
                        </CardDescription>

                        <CardAction>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              updateStatus(order._id, "Rejected");
                            }}
                          >
                            Reject
                          </Button>
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
                        <p>{order.quantity}x</p>
                        <p>Rs.{order.price}</p>
                      </CardContent>

                      <CardFooter className="flex justify-center gap-2">
                        <Button
                          variant="default"
                          onClick={() => {
                            updateStatus(order._id, "Processing");
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => previewCloth(order)}
                        >
                          Preview
                        </Button>
                        <Button variant="outline">Download logo</Button>
                        <Button variant="outline">Download design</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="processing">
                <ScrollArea className="lg:h-[80dvh] md:w-[50dvw] grid grid-cols-1 rounded-2xl">
                  {allOrderList
                    .filter((order: order) => order.status == "Processing")
                    .map((order: order, idx: number) => (
                      <Card key={idx} className="mb-4">
                        <CardHeader>
                          <CardTitle>{order.fullName}</CardTitle>

                          <CardDescription>
                            <p>{order.uid}</p>
                            <p>{order._id}</p>
                            <p>{order.createdAt}</p>
                          </CardDescription>

                          <CardAction>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                updateStatus(order._id, "Rejected");
                              }}
                            >
                              Reject
                            </Button>
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
                          <p>{order.quantity}x</p>
                          <p>Rs.{order.price}</p>
                        </CardContent>

                        <CardFooter className="flex justify-center gap-2">
                          <Button
                            variant="default"
                            onClick={() => {
                              updateStatus(order._id, "Processing");
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => previewCloth(order)}
                          >
                            Preview
                          </Button>
                          <Button variant="outline">Download logo</Button>
                          <Button variant="outline">Download design</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="delivering">
                <div>Orders in delivering</div>
              </TabsContent>

              <TabsContent value="delivered">
                <div>Orders in delevered</div>
              </TabsContent>

              <TabsContent value="finance">
                <div>Finance</div>
              </TabsContent>
            </Tabs>
          </section>
        ) : (
          <section className="h-[100dvh] p-2">
            <div className="pt-12 flex justify-center">
              <Spinner className="size-8" />
              <h2>Loading...</h2>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Admin;
