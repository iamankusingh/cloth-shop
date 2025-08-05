import PageTitle from "@/components/PageTitle";
import useUserStore from "@/store/userStore";
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Admin: React.FC = () => {
  // from clerk
  const { isSignedIn, userId } = useAuth();

  // user zustand store
  const { updateIsSignedIn, updateUid } = useUserStore();

  const navigate = useNavigate();

  const verifyAdmin = async (): Promise<void> => {
    console.log("Verifying admin...", userId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin?uid=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "Application/json",
          },
        }
      );

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
          },
        }
      );

      if (response) {
        const result = await response.json();
        console.log("all users data ", result);
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

      <main className="h-[50vh] lg:h-screen w-screen lg:w-[50vw]">
        {isSignedIn ? (
          <section className="p-2">
            <div className="pt-12">
              <h2>Welcome Admin</h2>
            </div>
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
