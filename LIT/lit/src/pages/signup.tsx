import { Button, Input } from "@chakra-ui/react";
import {
  useForm,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import logo from "../LITLOGONT.png";
import { User } from "../types/user";
import { ReactElement, JSXElementConstructor, useState } from "react";
import { POST } from "../services/apiservice";

export const Signup = () => {
  const {
    getValues,
    trigger,
    control,
    formState: { errors },
  } = useForm<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (data: User) => {
    console.log(data);

    const response = await POST<User>("/users/signup", {
      method: "POST",
      body: data,
    }).then((res) => {
      console.log(res);
      setLoading(false);
    });
    // Handle form submission, e.g., send login request
  };
  return (
    <div className="flex justify-center items-center bg-gray-300 h-screen">
      <div className="bg-white rounded-md w-2/3 h-2/3 overflow-hidden py-3 flex flex-col justify-center items-center">
        {/* Add your content here */}
        <div className="w-3/4 h-3/4 flex flex-col justify-center items-center">
          <img className="h-20 w-30" src={logo} alt="Logo" />
          <form className="w-full">
            <Controller
              name="phoneNumber"
              rules={{ required: "Phone number is required" }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Input
                    placeholder="Mobile Number"
                    className="mb-4"
                    onChange={onChange}
                    value={value ?? ""}
                    type="number"
                  />

                  {errors.phoneNumber && (
                    <div className="error">{errors.phoneNumber?.message}</div>
                  )}
                </div>
              )}
            />
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Input
                    placeholder="Full Name"
                    className="mb-4"
                    value={value ?? ""}
                    onChange={onChange}
                  />
                  {errors.name && (
                    <div className="error">{errors.name?.message}</div>
                  )}
                </div>
              )}
            />
            <Controller
              name="username"
              control={control}
              rules={{ required: "username is required" }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Input
                    placeholder="Username"
                    className="mb-4"
                    onChange={onChange}
                    value={value ?? ""}
                  />
                  {errors.username && (
                    <div className="error">{errors.username?.message}</div>
                  )}
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: "password is required" }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Input
                    placeholder="Password"
                    onChange={onChange}
                    value={value ?? ""}
                    type="password"
                  />
                  {errors.password && (
                    <div className="error">{errors.password?.message}</div>
                  )}
                </div>
              )}
            />

            <Button
              className="mt-6 w-full"
              onClick={() => {
                trigger().then((isValid) => {
                  if (isValid) {
                    setLoading(true);

                    onSubmit(getValues());
                  }
                });
              }}
              isLoading={loading}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
