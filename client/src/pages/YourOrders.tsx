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
import useClothConfigStore from "@/store/clothConfigStore";
import { Copy } from "lucide-react";

interface order {
  _id: string;
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
  quantity: number;
  price: number;
  status: string;
}

const YourOrders: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { userId } = useAuth();
  const uid = userId as string;

  const [allOrders, setAllOrders] = useState<[]>([]);

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

  const previewOrder = (order: order) => {
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

  const copyToClipboard = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      toast.success("Copied order ID", {
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    } catch (error) {
      toast.error("Failed to copy ID", {
        action: {
          label: "Ok",
          onClick: () => console.log(error),
        },
      });
    }
  };

  return (
    <>
      <PageTitle title="Cloth shop - Your orders" />

      <main className="h-[50dvh] lg:h-screen w-screen lg:w-[50vw] py-2 px-4 lg:pt-16 lg:pl-20">
        <ScrollArea className="h-full w-full rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allOrders
              .slice(0)
              .reverse()
              .map((order: order, idx: number) => (
                <Card key={idx} className="py-4 gap-4">
                  <CardHeader className="px-3">
                    <CardTitle>T-Shirt</CardTitle>

                    <CardDescription>
                      <p>{new Date(order.createdAt).toLocaleString()}</p>
                      <p>{order._id}</p>
                    </CardDescription>

                    <CardAction className="text-center">
                      <Button
                        variant="outline"
                        title="Copy ID"
                        onClick={() => copyToClipboard(order._id)}
                      >
                        <Copy />
                      </Button>
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
                    <p>Design: {order.design}</p>
                    <p>Fabric: {order.clothFabric}</p>
                    <p>Size: {order.clothSize}</p>
                    <p>Quantity: {order.quantity}x</p>
                    <p>Rs.{order.price}</p>
                  </CardContent>

                  <CardFooter className="px-3 flex justify-between">
                    <p>Status: {order.status}</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        previewOrder(order);
                      }}
                    >
                      Preview
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
