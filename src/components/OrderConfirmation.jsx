function OrderConfirmation({ order }) {
  return (
    <div>
      <h2>Thank you for your order</h2>
      {order && (
        <div>
          <p>Customer`&apos;`s name: {order.name}</p>
          <p>Customer`&apos;`s address: {order.address}</p>
          <p>Items ordered:</p>
          <ul>
            {order.items.map((itm) => (
              <li key={itm.item.id}>{itm.item.name}</li>
            ))}
          </ul>
          <p>Order ID: {order.id}</p>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmation;
