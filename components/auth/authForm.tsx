"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormMessage, FormField } from "../ui/form";
import { Button } from "../ui";
import CustomInput from "./customInput";
import { authFormSchema } from "lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmail } from "lib/actions/sign-up";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "components/ui/select";
import { Label } from "components/ui/label";
import { cn } from "lib/utils";
import { createUser, signUserIn } from "lib/actions/user";

interface AuthFormProps {
  type: "sign-up" | "sign-in" | "email" | "shipping-details";
  email?: string;
}

const AuthForm = ({ type, email }: AuthFormProps) => {
  const router: any = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (type === "email") {
      router.prefetch(`check-email`);
    }
    if (type === "sign-up") {
      const emailAuth = localStorage.getItem("emailAuth");
      if (emailAuth !== email) {
        return router.replace("/sign-up/email-form");
      }
    }
    setDisabled(false);
  }, [router]);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      password: "",
    },
  });

  const emailValue = form.watch("email");

  useEffect(() => {
    if (emailValue) {
      form.setValue("email", emailValue.trim(), { shouldValidate: true });
    }
  }, [emailValue, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Email Form:
    if (type === "email" && data.email) {
      //check if the user has already initialzed sign up

      //generate token & send email verification
      const response = await verifyEmail(data.email);

      const searchParams = new URLSearchParams({
        email: data.email,
      });

      if (response?.status === 200) {
        //add token and email to localStorage
        localStorage.setItem("emailAuth", data.email);
        console.log("set email to localStorage ");

        //move to check email
        return router.push(`check-email?${searchParams.toString()}`);
      } else if (response?.status === 400) {
        //email exists in the database
        form.setError("email", {
          message: "Email already in use, try signing in",
        });
      } else {
        // handle error
        form.setError("email", { message: "Network Error!" });
      }
    }

    // Sign Up Form:
    if (type === "sign-up") {
      const userData: SignUpParams = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        email: email!,
        password: data.password!,
        username: data.username!,
      };
      const response = await createUser(userData);
      if (response?.status === 200) {
        //clear the local storage
        localStorage.removeItem("emailAuth");
        const redirect = localStorage.getItem("redirect");
        if (redirect) {
          localStorage.removeItem("redirect");
          return router.replace(redirect);
        }
        return router.replace("/");
      } else if (response?.status === 400) {
        // username exists
        form.setError("username", { message: "Username is already taken" });
      } else {
        //handle error
        form.setError("username", { message: "Network Error" });
      }
    }

    // Sign In Form
    if (type === "sign-in") {
      const response = await signUserIn({
        email: data.email!,
        password: data.password!,
      });

      if (response?.status === 200) {
        localStorage.removeItem("emailAuth");
        const redirect = localStorage.getItem("redirect");
        if (redirect) {
          localStorage.removeItem("redirect");
          return router.replace(redirect);
        }
        return router.push("/");
      } else {
        form.setError("password", { message: response.message });
      }
    }

    setIsLoading(false);
  };

  const getHeading = () => {
    if (type === "sign-up") {
      return "One more step";
    } else if (type === "sign-in") {
      return "Create your Qr Me account";
    } else {
      return "";
    }
  };

  return (
    <section className="auth-form">
      <header>
        <Link href="/" className="cursor-pointer flex items-center gap-1 py-5">
          <Image src="/logo_3.svg" width={125} height={50} alt="Qr Me logo" />
        </Link>

        <div>
          {getHeading()}

          <h3 className="sub-header-text font-light">
            Manage all your Qr Codes under one account.
          </h3>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

              {type === "sign-up" && (
                <CustomInput
                  control={form.control}
                  name="username"
                  label="Username"
                  placeholder="Enter your username"
                />
              )}
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              {type === "shipping-details" && (
                <FormField
                  control={form.control}
                  name={"shoppingPreference"}
                  render={({ field }) => (
                    <div className="form-item">
                      <Label title="shoppingPreference" className="form-label">
                        Shopping Preference
                      </Label>
                      <Select
                        onValueChange={(
                          value: ShipppingDetails["shoppingPreference"]
                        ) => {
                          form.setValue("shoppingPreference", value, {
                            shouldValidate: false,
                          });
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
              )}
            </>
          )}

          <div className="flex flex-col pt-5  gap-4">
            <Button
              type="submit"
              disabled={isLoading || disabled}
              className="form-btn"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  {"Loading..."}
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
            href={type === "sign-in" ? "/sign-up/email-form" : "/sign-in"}
            className="link-highlight"
          >
            {type === "sign-in" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </footer>
    </section>
  );
};

export default AuthForm;
