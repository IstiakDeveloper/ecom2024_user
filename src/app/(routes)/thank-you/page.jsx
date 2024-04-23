"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


function ThankYou() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);

  // useEffect(() => {
  //   const storedOrderData = sessionStorage.getItem('orderData');
  //   if (storedOrderData) {
  //     setOrderData(JSON.parse(storedOrderData));
  //   }
  // }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      {orderData ? (
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Order Details:</h2>
          <p><strong>Order ID:</strong> {orderData.order_id}</p>
          <p><strong>Customer Name:</strong> {orderData.customer_name}</p>
          <p><strong>Customer Phone:</strong> {orderData.customer_phone}</p>
          <p><strong>Customer District:</strong> {orderData.customer_district}</p>
          <p><strong>Customer Thana:</strong> {orderData.customer_thana}</p>
          <p><strong>Total Amount:</strong> {orderData.total_amount}</p>
          <p><strong>Address:</strong> {orderData.address}</p>
          <h3 className="text-lg font-bold mt-4">Order Items:</h3>
          <ul>
            {orderData.order_items.map((item, index) => (
              <li key={index}>
                <p><strong>Product Name:</strong> {item.product_name}</p>
                <p><strong>Image:</strong> {item.image}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Amount:</strong> {item.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ThankYou;
