"use client";
import { Button } from "@/components/ui/button";
import { LoaderIcon, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

function ProductItemDetails({ product }) {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("customer"));
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const { category } = product;
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.selling_price ? product.selling_price : product.price
  );
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const addToCart = () => {
    setLoading(true);
    if (!token) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }

    const data = {
      quantity: quantity,
      product_id: product.id,
      customer_id: user.id,
      amount: (quantity * productTotalPrice).toFixed(2),
    };

    GlobalApi.addToCart(data, token).then(
      (resp) => {
        toast("Added to cart");
        setUpdateCart(!updateCart);
        setLoading(false);
      },
      (e) => {
        toast("Error while adding into cart");
        setLoading(false);
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={process.env.NEXT_PUBLIC_BACKEDN_BASE_URL + product?.image}
        width={325}
        height={300}
        alt="image"
        unoptimized={true}
        className=" bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-2xl">{product.name}</h2>
        <h2 className="text-gray-500 text-sm">{product.description}</h2>
        <div className="flex gap-5">
          {product.selling_price && (
            <h2 className="font-bold text-3xl">
              &#2547;{product.selling_price}
            </h2>
          )}
          <h2
            className={`font-bold text-3xl ${
              product.selling_price && "line-through text-gray-500"
            } `}
          >
            &#2547;{product.price}
          </h2>
        </div>
        <h2 className="font-medium text-lg">
          Quantity ({product.itemQuantityType}6pcs)
        </h2>
        <div className="flex flex-col items-baseline">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-10 item-center px-5">
              <button
                className="font-bold text-lg"
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2 className="font-bold text-lg">{quantity}</h2>
              <button
                className="font-bold text-lg"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <h2 className="font-bold text-lg">
              {" "}
              = &#2547;{(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>
          <Button
            onClick={() => addToCart()}
            className="flex gap-3 mt-4"
            disabled={loading}
          >
            <ShoppingBasket />
            {loading ? <LoaderIcon className="animate-spin" /> : "Add To Cart"}
          </Button>
        </div>
        <h2>
          <span className="mr-2 font-bold">Category:</span>
          {category.name}
        </h2>
      </div>
    </div>
  );
}

export default ProductItemDetails;
