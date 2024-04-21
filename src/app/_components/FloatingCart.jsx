import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CartItemList from "./CartItemList";
import { useRouter } from "next/navigation";
import { ShoppingBasket } from 'lucide-react';

function FloatingCart({ totalCartItem, cartItemList, subtotal, onDeleteItem, isLoggedIn }) {
  const router = useRouter();

  return (
    <div className='fixed right-0 transform floatingCart bg-primary px-4 py-2 rounded-l-full'>
      <Sheet>
        <SheetTrigger>
          <h2 className="flex gap-2 items-center text-lg">
            <ShoppingBasket className="h-9 w-9 text-white" /> 
            <span className="bg-white text-primary px-2 rounded-full">
              {totalCartItem}
            </span>
          </h2>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="bg-primary text-white font-bold text-lg p-2 mt-5">
              My Cart
            </SheetTitle>
            <SheetDescription>
              <CartItemList
                cartItemList={cartItemList}
                onDeleteItem={onDeleteItem}
              />
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <div className="absolute w-[90%] bottom-6 flex flex-col">
              <h2 className="text-lg font-bold flex justify-between">
                Subtotal: <span>&#2547; {subtotal}</span>
              </h2>
              <Button onClick={() => router.push(isLoggedIn ? "/checkout" : "/sign-in")}>
                Checkout
              </Button>
            </div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default FloatingCart;
