import PageTitle from "@/components/PageTitle";
// import useUserStore from "@/store/userStore";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  quantity?: number;
  price?: number;
}

const YourOrders = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { userId } = useAuth();
  const uid = userId as string;

  const [allOrders, setAllOrders] = useState<[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/user/all-orders?uid=${uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Fetched orders:", result);
        setAllOrders(result.data);
        toast.success(result.message, {
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });
      } else {
        console.error("Failed to fetch orders");
        toast.error("Failed to fetch orders", {
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  return (
    <>
      <PageTitle title="Cloth shop - Your orders" />

      <main className="h-[50vh] lg:h-screen w-screen lg:w-[50vw] py-2 lg:pt-16 lg:pl-20">
        <ScrollArea className="h-full w-full rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allOrders.map((order: order, idx: number) => (
              <Card key={idx} className="py-4 gap-4">
                <CardHeader className="px-3">
                  <CardTitle>T-Shirt</CardTitle>

                  <CardDescription>
                    <p>{new Date(order.createdAt).toLocaleString()}</p>
                  </CardDescription>

                  <CardAction>
                    <Button variant="outline">Preview</Button>
                  </CardAction>
                </CardHeader>

                <CardContent className="px-3">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: order.hexColor }}
                  ></div>

                  <p>Logo: {order.logo}</p>
                  <p style={{ color: order.clothTextColor }}>
                    Text with color: {order.clothText}
                  </p>
                  <p>{order.design}</p>
                  <p>Fabric: {order.clothFabric}</p>
                  <p>Size: {order.clothSize}</p>
                  <p>Quantity: {order.quantity}x</p>
                  <p>Rs.{order.price}</p>
                </CardContent>

                <CardFooter className="px-3">
                  {/* <Button variant="outline">Mark as start Producing</Button> */}
                  <Button
                    variant="destructive"
                    // onClick={() => previewCloth(order.uid)}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </>
  );
};

export default YourOrders;
