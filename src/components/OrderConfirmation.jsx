function OrderConfirmation({ order }) {
  return (
    <div>
      <h2>Thank you for your order</h2>
      {order && (
        <div>
          <p>Customer`&apos;`s name: {order.customerName}</p>
          <p>Customer`&apos;`s address: {order.customerAddress}</p>
          <p>Items ordered:</p>
          <ul>
            {order.items.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
          <p>Order ID: {order.orderId}</p>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmation;
