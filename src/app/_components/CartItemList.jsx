import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function CartItemList({ cartItemList, onDeleteItem }) {
  return (
    <div>
      <div
        className="cart-items-container"
        style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
      >
        {cartItemList.map((cart, index) => (
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-6 items-center">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEDN_BASE_URL + cart.image}
                width={70}
                height={70}
                alt={cart.name}
                unoptimized={true}
                className="border p-2"
              />
              <div>
                <h2 className="font-bold">{cart.name}</h2>
                <h2>Quantity {cart.quantity}</h2>
                <h2 className="text-lg font-bold">&#2547; {cart.amount}</h2>
              </div>
            </div>
            <TrashIcon
              className="cursor-pointer"
              onClick={() => onDeleteItem(cart.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItemList;
