import React, { useState } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "lib/utils";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "../ui/button";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  const [hide, setHide] = useState(name === "password" ? false : true);

  const handleHideClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setHide((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="relative w-full flex flex-col">
            <FormControl>
              <>
                <Input
                  placeholder={placeholder}
                  className="input-class pr-12 "
                  type={name === "password" && !hide ? "password" : "text"}
                  {...field}
                />
                {name === "password" && (
                  <>
                    {hide ? (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute inset-y-1 right-1 flex"
                        onClick={handleHideClick}
                      >
                        <EyeOff className="h-5 w-5" />
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute inset-y-1 right-1 flex"
                        onClick={handleHideClick}
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                    )}
                  </>
                )}
              </>
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
