import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  return (
    <div>
      <h2>Order Confirmation</h2>
      {loading && <p>Loading...</p>}
      {!loading && order && <OrderConfirmation order={order} />}
      {!loading && !order && <p>Failed to fetch order!</p>}
    </div>
  );
}

export default ConfirmationPage;
