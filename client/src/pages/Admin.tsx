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

  useEffect(() => {
    if (isSignedIn === undefined) return;

    if (isSignedIn) {
      updateIsSignedIn(true);
      updateUid(userId || "");
      console.log("Someone has signed in, verifying for admin");

      verifyAdmin();
      fetchAllUsers();
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
          <section className="p-2">
            <div className="pt-12">
              <h2 className="">Welcome Admin</h2>
            </div>

            <Tabs defaultValue="allUsers">
              <TabsList className="w-full">
                <TabsTrigger value="allUsers" onClick={() => fetchAllUsers()}>
                  All Users
                </TabsTrigger>
                <TabsTrigger value="orders" onClick={() => fetchAllOrders()}>
                  Orders
                </TabsTrigger>
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
                        <Button variant="outline">
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
