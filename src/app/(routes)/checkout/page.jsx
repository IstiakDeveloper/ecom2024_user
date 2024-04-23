"use client";
import districtsData from "@/app/_jsons/districts.json";
import thanasData from "@/app/_jsons/thanas.json";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { UpdateCartContext } from "@/app/_context/UpdateCartContext";

function Checkout() {

  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [thanas, setThanas] = useState([]);
  const [selectedThana, setSelectedThana] = useState("");
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash_on_delivery");
  const [address, setAddress] = useState();
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);




  useEffect(() => {
    if (!token) {
      router.push("/sign-in");
    }
    getCartItems();
    // Set districts data from imported JSON
    setDistricts(districtsData);
  }, []);

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, token);
    const totalItems = cartItemList_.length;
    setTotalCartItem(totalItems);
    setCartItemList(cartItemList_);
  
    // Check if cart is empty
    if (totalItems === 0) {
      // Show toast message
      toast("Your cart is empty. Please select some products first.");
      
      // Redirect to the home page
      router.push('/');
    }
  };
  



  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total += parseFloat(element.amount);
    });
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);

  const calculateTotalAmount = () => {
    const totalAmount = parseFloat(subtotal) + 15;
    return totalAmount.toFixed(2);
  };


  // Handle district selection
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
    // Set thanas data for the selected district from imported JSON
    setThanas(thanasData[selectedDistrict] || []);
  };

  // Handle thana selection
  const handleThanaChange = (e) => {
    const selectedThana = e.target.value;
    setSelectedThana(selectedThana);
  };

  // Handle payment confirmation and order placement
  const handlePaymentConfirmation = async () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Check if the cart is empty
    if (totalCartItem === 0) {
      // Redirect to the home page with a message
      router.push({
        pathname: "/",
        query: { message: "Please select some products." },
      });
      return;
    }

    // Convert cartItemList into order items format
    const orderItems = cartItemList.map((item) => ({
      product_name: item.name,
      image: item.image,
      quantity: item.quantity,
      amount: item.amount,
    }));

    const orderData = {
      customer_name: user.username,
      customer_id: user.id,
      customer_phone: user.phone,
      customer_district: selectedDistrict,
      customer_thana: selectedThana,
      total_amount: calculateTotalAmount(),
      address: address,
      order_items: orderItems,
    };

    try {
      const response = await GlobalApi.placeOrder(orderData, token);
      toast("Order created successfully");

      // Delete all cart items one by one
      await Promise.all(
        cartItemList.map((item) => GlobalApi.deleteCartItem(item.id, token))
      );

      // Update the cart items
      setCartItemList([]);
      sessionStorage.setItem('orderData', JSON.stringify(orderData));
      router.push('/thank-you')
    } catch (error) {
      console.error("Error while creating order:", error);
      toast("Error while creating order");
    }
  };


  return (
    <div className="">
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 md:px-5 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-10 mb-5 md:mx-20">
          <h2 className="font-bold text-3xl">Billing Address</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input placeholder="Name" value={user.username} />
            <Input placeholder="Phone" value={user.phone} />
          </div>
          <div className="mt-3">
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="block w-full p-2 border rounded-md"
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <select
              value={selectedThana}
              onChange={handleThanaChange}
              className="block w-full p-2 border rounded-md"
            >
              <option value="">Select Thana</option>
              {thanas.map((thana, index) => (
                <option key={index} value={thana}>
                  {thana}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <Textarea
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="flex justify-between font-bold">
              Subtotal : <span>&#2547; {subtotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery : <span>&#2547; 15:00</span>
            </h2>
            <hr />
            <h2 className="flex justify-between font-bold">
              Total : <span>&#2547; {calculateTotalAmount()}</span>
            </h2>

            <Dialog>
              <DialogTrigger>
                <Button className="w-full">
                  Payment <ArrowBigRight />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <div className="flex flex-col items-center justify-center">
                      <div className="">
                        <h2 className="text-lg font-semibold mb-4">
                          Select Payment Method
                        </h2>

                        <label className="inline-flex items-center mb-4 mr-6">
                          <input
                            type="radio"
                            className="form-radio h-5 w-5 text-blue-500"
                            name="payment"
                            value="cash_on_delivery"
                            checked={
                              selectedPaymentMethod === "cash_on_delivery"
                            }
                            onChange={() =>
                              setSelectedPaymentMethod("cash_on_delivery")
                            }
                          />
                          <span className="ml-2">Cash On Delivery</span>
                        </label>

                        <label className="inline-flex items-center ml-6">
                          <input
                            type="radio"
                            className="form-radio h-5 w-5 text-blue-500"
                            name="payment"
                            value="mobile_banking"
                            checked={selectedPaymentMethod === "mobile_banking"}
                            onChange={() =>
                              setSelectedPaymentMethod("mobile_banking")
                            }
                          />
                          <span className="ml-2">Mobile Banking</span>
                        </label>
                      </div>

                      <Button className="" onClick={handlePaymentConfirmation}>
                        Confirm Payment <ArrowBigRight />
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
