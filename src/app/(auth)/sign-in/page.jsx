"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";

function SignIn() {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.SignIn(phone, password).then(
      (resp) => {
        sessionStorage.setItem("customer", JSON.stringify(resp.data.user));
        sessionStorage.setItem("token", resp.data.token);
        toast("Sign In successfully");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        toast(e.response.data.message);
        setLoader(false);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center bg-slate-100 p-4">
        <Link href={'/'}><Image src="/logo.png" width={200} height={200} alt="logo" /></Link>
        <h2 className="font-bold text-3xl">Sign In to Account</h2>
        <h2 className="text-gray-500">
          Enter your phone number or email and password to sign in
        </h2>

        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => onSignIn()} disabled={!(phone || password)}>
            {loader ? <LoaderIcon className=" animate-spin" /> : "Sign In"}
          </Button>
          <p>
            Don't have an account?{" "}
            <Link className="text-blue-500" href={"/create-account"}>
              Click here to create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
