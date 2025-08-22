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
  // CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card";

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
  const { userId } = useAuth();
  const uid = userId as string;

  const [allOrders, setAllOrders] = useState<[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/all-orders?uid=${uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
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

      <main className="h-[50vh] lg:h-screen w-screen lg:w-[50vw] pt-2 lg:pt-14">
        <section className="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {allOrders.map((order: order, idx: number) => (
            <Card key={idx} className="mb-4">
              <CardHeader>
                {/* <CardTitle>Username</CardTitle> */}

                <CardDescription>
                  <p>{new Date(order.createdAt).toLocaleString()}</p>
                </CardDescription>

                <CardAction>
                  {/* <Button variant="destructive">Reject order</Button> */}
                </CardAction>
              </CardHeader>

              <CardContent className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: order.hexColor }}
                ></div>

                <p>{order.logo}</p>
                <p style={{ color: order.clothTextColor || undefined }}>
                  {order.clothText}
                </p>
                <p>{order.design}</p>
                <p>{order.quantity}x</p>
                <p>Rs.{order.price}</p>
              </CardContent>

              {/* <CardFooter className="flex justify-center gap-2">
                <Button variant="outline">Mark as start Producing</Button>
                <Button
                  variant="outline"
                  onClick={() => previewCloth(order.uid)}
                >
                  Preview
                </Button>
              </CardFooter> */}
            </Card>
          ))}
        </section>
      </main>
    </>
  );
};

export default YourOrders;
