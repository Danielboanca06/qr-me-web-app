"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Form, FormMessage, FormField } from "../ui/form";
import { Input, Button } from "../ui";
import CustomInput from "../customInput";
import { authFormSchema } from "@lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmail } from "@lib/actions/sign-up";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@components/ui/select";
import { Label } from "@components/ui/label";
import { cn } from "@lib/utils";

// import { signIn, signOut } from "next-auth/react";

// import PlaidLink from './PlaidLink';

type AuthFormInputs = SignUpParams & LoginUser;

const signUp = (d: any) => console.log(d, "sign up data");
const signIn = (d: any) => console.log(d, "sign in data");

interface AuthFormProps {
  type: "sign-up" | "sign-in" | "email";
  email?: string;
}

const AuthForm = ({ type, email }: AuthFormProps) => {
  const router: any = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === "email") {
      router.prefetch("user-details");
    }
    if (searchParams)
      console.log("ther is search params", searchParams.get("email"));
  }, [router]);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "email" && data.email) {
        // console.log(data);
        await verifyEmail(data.email);

        // router.push(`user-details?email=${encodeURIComponent(data.email)}`);

        return;
      }
      if (type === "sign-up") {
        const userData: SignUpParams = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          email: data.email!,
          password: data.password!,
          shoppingPreferance: data.shoppingPreferance!,
        };

        const newUser = await signUp(userData);

        // setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        // if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header>
        <Link href="/" className="cursor-pointer flex items-center gap-1 py-5">
          <Image src="/logo_3.svg" width={125} height={50} alt="Qr Me logo" />
        </Link>

        <div>
          {type === "sign-up" ? (
            <h1 className="header-text pb-2">One more step</h1>
          ) : (
            <h1 className="header-text pb-2">Create your Qr Me account</h1>
          )}

          <h3 className="sub-header-text font-light">
            Manage all your Qr Codes under one account.
          </h3>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type !== "sign-up" && (
                <CustomInput
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />
              )}

              {type !== "email" && (
                <>
                  {type === "sign-up" && (
                    <>
                      {/* <CustomInput
                        control={form.control}
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="Enter your Phone Number"
                      /> */}
                      <div className="flex gap-4">
                        <CustomInput
                          control={form.control}
                          name="firstName"
                          label="First Name"
                          placeholder="First name"
                        />
                        <CustomInput
                          control={form.control}
                          name="lastName"
                          label="Last Name"
                          placeholder="Last name"
                        />
                      </div>
                    </>
                  )}

                  <CustomInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                  />

                  <FormField
                    control={form.control}
                    name={"shoppingPreferance"}
                    render={({ field }) => (
                      <div className="form-item">
                        <Label
                          title="shoppingPreferance"
                          className="form-label"
                        >
                          Shopping Preference
                        </Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger
                            className={`flex w-full bg-white-100 gap-3 `}
                          >
                            <p
                              className={cn("line-clamp-1 w-full text-left", {
                                "opacity-60": !field.value,
                              })}
                            >
                              {field.value ?? "Select"}
                            </p>
                          </SelectTrigger>
                          <SelectContent
                            className={`w-full bg-white-100 `}
                            align="start"
                          >
                            <SelectGroup {...form}>
                              <SelectItem
                                key={"Male"}
                                value={"Men's"}
                                className="cursor-pointer border-t"
                              >
                                <div className="flex flex-col ">
                                  <p className=" font-medium">{"Men's"}</p>
                                  <p className=" font-medium text-blue-600">
                                    {/* {formatAmount(account.currentBalance)} */}
                                  </p>
                                </div>
                              </SelectItem>
                              <SelectItem
                                key={"Female"}
                                value={"Women's"}
                                className="cursor-pointer border-t"
                              >
                                <div className="flex flex-col ">
                                  <p className=" font-medium">{"Women's"}</p>
                                  <p className=" font-medium text-blue-600">
                                    {/* {formatAmount(account.currentBalance)} */}
                                  </p>
                                </div>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage className="form-message mt-2" />
                      </div>
                    )}
                  />
                </>
              )}

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="link-highlight"
              >
                {type === "sign-in" ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
