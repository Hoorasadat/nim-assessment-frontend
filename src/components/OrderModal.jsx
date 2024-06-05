import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = [];

    if (!name) {
      newErrors.push("Name is required!");
    }
    if (!phone) {
      newErrors.push("Phone number is required!");
    } else if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) {
      newErrors.push("Phone number is invalid!");
    }
    if (!address) {
      newErrors.push("Address is required!");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const formatPhoneNumber = (enteredPhone) => {
    const cleaned = `${enteredPhone}`.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return enteredPhone;
  };

  const placeOrder = async () => {
    if (!validateFields()) {
      return;
    }

    const formattedPhone = formatPhoneNumber(phone);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone: formattedPhone,
        address,
        items: order
      })
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    const data = await response.json();
    const orderId = data.id;
    setOrderModal(false);
    navigate.push(`/order-confirmation/${orderId}`);
  };
  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        {errors.length > 0 && (
          <div className={styles.errorMessages}>
            {errors.map((error) => (
              <p className={styles.errorMessage}>{error}</p>
            ))}
          </div>
        )}
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
