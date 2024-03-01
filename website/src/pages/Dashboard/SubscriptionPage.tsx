import { useEffect, useState } from "react";
import { DashboardPricing } from "../../components/Dashboard/DashboardPricing";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api.service";
import { useUser } from "../../contexts/UserContext";
import PricingPage from "../../images/PricingPage.gif";
import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

export default function SubscriptionPage() {
  const { subscriptionActive } = useUser();
  return (
    <>
      <Sidebar currentSelectedPage="Subscription">
        {subscriptionActive ? <SubscriptionDetails /> : <DashboardPricing />}
      </Sidebar>
    </>
  );
}

function SubscriptionDetails() {
  const [link, setLink] = useState("");
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getLink = async () => {
      try {
        const response = await api.stripe.getCustomerPortalUrl();
        setLink(response);
        setLoading(false);
      } catch (error) {
        setError("Error getting subscription details");
        setLoading(false);
      }
    };
    getLink();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" align-center text-center">
      <h1 className=" text-3xl  text-gray-700 text-center mt-10  font-bold">
        My Subscription
      </h1>
      <img
        src={PricingPage}
        className="mx-auto mt-10"
        style={{ height: "200px" }}
      />
      <Button
        onClick={() => (window.location.href = link)}
        variant={"destructive"}
      >
        Cancel Subscription
      </Button>
    </div>
  );
}
