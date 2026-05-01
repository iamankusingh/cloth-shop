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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

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
  designUrl?: string;
  clothFabric?: string;
  quantity?: number;
  price?: number;
  status: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

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
    updateDesignUrl,
    updateClothSize,
    updateClothFabric,
    updateQuantity,
    updatePrice,
  } = useClothConfigStore();

  const { updateShow } = useCanvasStore();

  const navigate = useNavigate();

  const [allUsersList, setAllUsersList] = useState<[]>([]);
  const [allOrderList, setAllOrderList] = useState<[]>([]);

  // counts
  const [usersCount, setUserCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [acceptedCount, setAcceptedCount] = useState<number>(0);
  const [rejectedCount, setRejectedCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [processingCount, setProcessingCount] = useState<number>(0);
  const [deliveringCount, setDeliveringCount] = useState<number>(0);
  const [deliveredCount, setDeliveredCount] = useState<number>(0);
  const [totalEarned, setTotalEarned] = useState<number>(0);
  const [onTheWayCount, setOnTheWayCount] = useState<number>(0);
  const [cancelledCount, setCancelledCount] = useState<number>(0);

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
        updateDesignUrl(result.data.designUrl);
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

  useEffect(() => {
    setUserCount(allUsersList.length);
    setOrderCount(allOrderList.length);
    setAcceptedCount(
      allOrderList.filter(
        (order: order) =>
          order.status !== "Rejected" && order.status !== "Pending",
      ).length,
    );
    setRejectedCount(
      allOrderList.filter((order: order) => order.status == "Rejected").length,
    );
    setPendingCount(
      allOrderList.filter((order: order) => order.status == "Pending").length,
    );
    setProcessingCount(
      allOrderList.filter((order: order) => order.status == "Processing")
        .length,
    );
    setDeliveringCount(
      allOrderList.filter((order: order) => order.status == "Delivering")
        .length,
    );
    setDeliveredCount(
      allOrderList.filter((order: order) => order.status == "Delivered").length,
    );
    setTotalEarned(
      allOrderList
        .filter((order: order) => order.status == "Delivered")
        .reduce((total: number, order: order) => total + (order.price || 0), 0),
    );
    setOnTheWayCount(
      allOrderList
        .filter(
          (order: order) =>
            order.status == "Processing" || order.status == "Delivering",
        )
        .reduce((total: number, order: order) => total + (order.price || 0), 0),
    );
    setCancelledCount(
      allOrderList
        .filter((order: order) => order.status == "Rejected")
        .reduce((total: number, order: order) => total + (order.price || 0), 0),
    );
  }, [allUsersList, allOrderList]);

  return (
    <>
      <PageTitle title="Cloth shop - Admin" />

      <main className="min-h-[50dvh] lg:min-h-screen w-screen lg:min-w-[50vw]">
        {isSignedIn ? (
          <div className="px-2 pt-14 pb-1">
            <Tabs defaultValue="overview">
              <TabsList className="h-auto w-full px-2 z-100 flex flex-wrap">
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
                  value="allOrders"
                  onClick={() => {
                    updateShow(true);
                  }}
                >
                  All Orders
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
                    updateShow(true);
                  }}
                >
                  Delivering
                </TabsTrigger>

                <TabsTrigger
                  value="delivered"
                  onClick={() => {
                    updateShow(true);
                  }}
                >
                  Delivered
                </TabsTrigger>

                <TabsTrigger
                  value="rejected"
                  onClick={() => {
                    updateShow(true);
                  }}
                >
                  Rejected
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Welcome Admin</h2>

                  <Button variant="outline" onClick={() => refreshDashboard()}>
                    Refresh
                  </Button>
                </div>

                <div className="pt-2 flex flex-col md:flex-row justify-around gap-2">
                  <section className="p-4 flex bg-card rounded-lg items-center justify-around gap-4">
                    <div className="text-sm md:text-lg">
                      <p>Users: {usersCount}</p>
                      <p>Orders: {orderCount}</p>
                      <p>Pending: {pendingCount}</p>
                      <p>Rejected: {rejectedCount}</p>
                      <p>Accepted: {acceptedCount}</p>
                      <p>Processing: {processingCount}</p>
                      <p>Delivering: {deliveringCount}</p>
                      <p>Delivered: {deliveredCount}</p>
                    </div>

                    <div className="h-60 w-60">
                      <Pie
                        data={{
                          labels: [
                            "Pending",
                            "Rejected",
                            "Processing",
                            "Delivering",
                            "Delivered",
                          ],
                          datasets: [
                            {
                              label: "",
                              data: [
                                pendingCount,
                                rejectedCount,
                                processingCount,
                                deliveringCount,
                                deliveredCount,
                              ],
                              backgroundColor: [
                                "#facc15",
                                "#ef4444",
                                "#3b82f6",
                                "#f97316",
                                "#22c55e",
                              ],
                            },
                          ],
                        }}
                      />
                    </div>
                  </section>

                  <section className="px-4 py-2 bg-card rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold mt-4">
                        Total Earned
                      </h3>
                      <p className="text-2xl font-bold">Rs.{totalEarned}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mt-4">
                        Processing & Delivering
                      </h3>
                      <p className="text-2xl font-bold">Rs.{onTheWayCount}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mt-4">
                        Cancelled Amount
                      </h3>
                      <p className="text-2xl font-bold">Rs.{cancelledCount}</p>
                    </div>
                  </section>
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

              <TabsContent value="allOrders">
                <ScrollArea className="lg:h-[80dvh] lg:w-[50dvw] grid grid-cols-1 rounded-2xl">
                  {allOrderList
                    .slice(0)
                    .reverse()
                    .map((order: order, idx: number) => (
                      <Card key={idx} className="mb-4">
                        <CardHeader className="px-2 lg:px-4">
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

                        <CardContent className="px-2 lg:px-4 space-y-4">
                          {allUsersList
                            .filter((user: User) => user.uid == order.uid)
                            .map((user: User, idx: number) => (
                              <div
                                key={idx}
                                className="flex  items-center gap-2"
                              >
                                <p>
                                  {user.houseNo}
                                  {user.locality}
                                  {user.city}
                                  {user.district}
                                  {user.pincode} - {user.phoneNo}
                                </p>
                              </div>
                            ))}

                          <div className="flex flex-wrap items-center gap-2">
                            <div
                              className="w-10 h-10 rounded-full"
                              style={{ backgroundColor: order.hexColor }}
                            ></div>
                            <p>{order.logo}</p>
                            <p style={{ color: order.clothTextColor }}>
                              {order.clothText}
                            </p>
                            <p>{order.design}</p>
                            <p>{order.quantity}x</p>
                            <p>Rs.{order.price}</p>
                            <p>{order.status}</p>
                          </div>
                        </CardContent>

                        <CardFooter className="px-2 lg:px-4 flex justify-center gap-2">
                          {order.status == "Pending" && (
                            <Button
                              variant="default"
                              onClick={() => {
                                updateStatus(order._id, "Processing");
                              }}
                            >
                              Accept
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            onClick={() => previewCloth(order)}
                          >
                            Preview
                          </Button>
                          <a
                            href={order.logoUrl || order.logoPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                order.logoUrl || order.logoPath
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Button variant="outline">See logo</Button>
                          </a>
                          <a
                            href={order.designUrl || order.designPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                order.designUrl || order.designPath
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Button variant="outline">See design</Button>
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="processing">
                <ScrollArea className="lg:h-[80dvh] lg:w-[50dvw] grid grid-cols-1 rounded-2xl">
                  {allOrderList
                    .filter((order: order) => order.status == "Processing")
                    .slice(0)
                    .reverse()
                    .map((order: order, idx: number) => (
                      <Card key={idx} className="mb-4">
                        <CardHeader className="px-2 lg:px-4">
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

                        <CardContent className="px-2 lg:px-4 flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-full"
                            style={{ backgroundColor: order.hexColor }}
                          ></div>

                          <p>{order.logo}</p>
                          <p style={{ color: order.clothTextColor }}>
                            {order.clothText}
                          </p>
                          <p>{order.design}</p>
                          <p>{order.quantity}x</p>
                          <p>Rs.{order.price}</p>
                        </CardContent>

                        <CardFooter className="px-2 lg:px-4 flex flex-wrap justify-center gap-2">
                          <Button
                            variant="default"
                            onClick={() => {
                              updateStatus(order._id, "Delivering");
                            }}
                          >
                            Deliver
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => previewCloth(order)}
                          >
                            Preview
                          </Button>
                          <a
                            href={order.logoUrl || order.logoPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                order.logoUrl || order.logoPath
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Button variant="outline">See logo</Button>
                          </a>
                          <a
                            href={order.designUrl || order.designPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                order.designUrl || order.designPath
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Button variant="outline">See design</Button>
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="delivering">
                <ScrollArea className="lg:h-[80dvh] lg:w-[50dvw] grid grid-cols-1 rounded-2xl">
                  {allOrderList
                    .filter((order: order) => order.status == "Delivering")
                    .slice(0)
                    .reverse()
                    .map((order: order, idx: number) => (
                      <Card key={idx} className="mb-4">
                        <CardHeader className="px-2 lg:px-4">
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

                        <CardContent className="px-2 lg:px-4 flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-full"
                            style={{ backgroundColor: order.hexColor }}
                          ></div>

                          <p>{order.logo}</p>
                          <p style={{ color: order.clothTextColor }}>
                            {order.clothText}
                          </p>
                          <p>{order.design}</p>
                          <p>{order.quantity}x</p>
                          <p>Rs.{order.price}</p>
                        </CardContent>

                        <CardFooter className="px-2 lg:px-4 flex flex-wrap justify-center gap-2">
                          <Button
                            variant="default"
                            onClick={() => {
                              updateStatus(order._id, "Delivered");
                            }}
                          >
                            Delivereds
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => previewCloth(order)}
                          >
                            Preview
                          </Button>
                          <a
                            href={order.logoUrl || order.logoPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                order.logoUrl || order.logoPath
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Button variant="outline">See logo</Button>
                          </a>
                          <a
                            href={order.designUrl || order.designPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                order.designUrl || order.designPath
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Button variant="outline">See design</Button>
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="delivered">
                <ScrollArea className="lg:h-[80dvh] lg:w-[50dvw] grid grid-cols-1 rounded-2xl">
                  {allOrderList
                    .filter((order: order) => order.status == "Delivered")
                    .slice(0)
                    .reverse()
                    .map((order: order, idx: number) => (
                      <Card key={idx} className="mb-4">
                        <CardHeader className="px-2 lg:px-4">
                          <CardTitle>{order.fullName}</CardTitle>

                          <CardDescription>
                            <p>{order.uid}</p>
                            <p>{order._id}</p>
                            <p>{order.createdAt}</p>
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="px-2 lg:px-4 flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-full"
                            style={{ backgroundColor: order.hexColor }}
                          ></div>

                          <p>{order.logo}</p>
                          <p style={{ color: order.clothTextColor }}>
                            {order.clothText}
                          </p>
                          <p>{order.design}</p>
                          <p>{order.quantity}x</p>
                          <p>Rs.{order.price}</p>
                        </CardContent>

                        <CardFooter className="px-2 lg:px-4 flex flex-wrap justify-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => previewCloth(order)}
                          >
                            Preview
                          </Button>
                          <a
                            href={order.logoUrl || order.logoPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                order.logoUrl || order.logoPath
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Button variant="outline">See logo</Button>
                          </a>
                          <a
                            href={order.designUrl || order.designPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                order.designUrl || order.designPath
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Button variant="outline">See design</Button>
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="rejected">
                <ScrollArea className="lg:h-[80dvh] lg:w-[50dvw] grid grid-cols-1 rounded-2xl">
                  {allOrderList
                    .filter((order: order) => order.status == "Rejected")
                    .slice(0)
                    .reverse()
                    .map((order: order, idx: number) => (
                      <Card key={idx} className="mb-4">
                        <CardHeader className="px-2 lg:px-4">
                          <CardTitle>{order.fullName}</CardTitle>

                          <CardDescription>
                            <p>{order.uid}</p>
                            <p>{order._id}</p>
                            <p>{order.createdAt}</p>
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="px-2 lg:px-4 flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-full"
                            style={{ backgroundColor: order.hexColor }}
                          ></div>

                          <p>{order.logo}</p>
                          <p style={{ color: order.clothTextColor }}>
                            {order.clothText}
                          </p>
                          <p>{order.design}</p>
                          <p>{order.quantity}x</p>
                          <p>Rs.{order.price}</p>
                        </CardContent>

                        <CardFooter className="px-2 lg:px-4 flex flex-wrap justify-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => previewCloth(order)}
                          >
                            Preview
                          </Button>
                          <a
                            href={order.logoUrl || order.logoPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                order.logoUrl || order.logoPath
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Button variant="outline">See logo</Button>
                          </a>
                          <a
                            href={order.designUrl || order.designPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                order.designUrl || order.designPath
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Button variant="outline">See design</Button>
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="h-[100dvh] p-2">
            <section className="pt-12 flex justify-center">
              <Spinner className="size-8" />
              <h2>Loading...</h2>
            </section>
          </div>
        )}
      </main>
    </>
  );
};

export default Admin;
