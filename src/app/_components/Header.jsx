"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  CircleUserRound,
  LayoutGrid,
  Search,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
GlobalApi;
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";
import { toast } from "sonner";
import FloatingCart from "./FloatingCart";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const isLogin = sessionStorage.getItem("token") ? true : false;
  const token = sessionStorage.getItem("token");
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const user = JSON.parse(sessionStorage.getItem("customer"));
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const router = useRouter();
  const [subtotal, setSubTotal] = useState(0);
  const [showFloatingCart, setShowFloatingCart] = useState(false);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total += parseFloat(element.amount);
    });

    setSubTotal(total.toFixed(2));
  }, [cartItemList]);

  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data);
    });
  };

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  // Used ti get Total Cart Items
  const getCartItems = async () => {

    if (!isLogin) {
      return;
    }
  
    // Fetch cart items if the user is logged in
    const cartItemList_ = await GlobalApi.getCartItems(user.id, token);
    setTotalCartItem(cartItemList_.length);
    setCartItemList(cartItemList_);
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, token).then((resp) => {
      toast("Item Removed!");
      getCartItems();
    });
  };

  const handleScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 200) {
        setShowFloatingCart(true);
      } else {
        setShowFloatingCart(false);
      }
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-2 md:gap-8">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={150} height={100} />
        </Link>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h2 className="md:flex hidden gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
                <LayoutGrid className=" h-5 w-5" /> Category
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categoryList.map((category, index) => (
                <Link key={index} href={"/products-category/" + category.name}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Image
                      className="mr-2"
                      src={
                        process.env.NEXT_PUBLIC_BACKEDN_BASE_URL +
                        category?.image
                      }
                      unoptimized={true}
                      alt="icon"
                      width={23}
                      height={23}
                    />
                    <h2>{category?.name}</h2>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>

        <div className="mr-4">
          <Link href={'/all-products'}>
          <Button> All Products</Button> </Link>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBasket className="h-9 w-9" />
              <span className="bg-primary text-white px-2 rounded-full">
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
                <Button
                  onClick={() => router.push(token ? "/checkout" : "/sign-in")}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound className="h-12 w-12 bg-green-100 text-primary p-2 rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={'/my-order'}><DropdownMenuItem>My Order</DropdownMenuItem></Link>
              <DropdownMenuItem onClick={() => onSignOut()}>
                Logout{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {showFloatingCart && (
        <FloatingCart
          totalCartItem={totalCartItem}
          cartItemList={cartItemList}
          subtotal={subtotal}
          onDeleteItem={onDeleteItem}
          isLoggedIn={isLogin}
        />
      )}
    </div>

    
  );
}

export default Header;
