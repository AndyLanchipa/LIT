import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../components/Input";
import { Label } from "../components/common/label";
import { LabelSize } from "../enums/LabelSize";
import { User } from "../types/user";
import { Button, Text, Checkbox, Icon, Image, Box } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import stockPhoto from "../loginPhoto.jpg";

export const Login = () => {
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<User>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>();

  const onSubmit = (data: User) => {
    console.log("da");
    setUser(data);
    // Handle form submission, e.g., send login request
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <div className="flex justify-evenly w-4/6 space-x-4 bg-white rounded-md h-4/6 overflow-hidden">
        <div className="flex-1 flex justify-center items-center px-14">
          <form className="mt-4">
            <div className="font-bold">
              <Label size={LabelSize.LARGE}>Welcome back</Label>
            </div>
            <div>
              <Text className="text-gray-400">
                Welcome back! Please enter your details.
              </Text>
            </div>
            <div className="flex flex-col items-start">
              <Label size={LabelSize.LARGE}>Username</Label>
              <Controller
                rules={{ required: "This field is required." }}
                control={control}
                name="username"
                render={({ field }) => (
                  <div className="w-full">
                    <Input
                      label=""
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                    {errors.username && (
                      <div className="error">{errors.username.message}</div>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="mt-4 flex flex-col">
              <div className="flex flex-col items-start">
                <Label size={LabelSize.LARGE}>Password</Label>
                <Controller
                  rules={{
                    required: "Password is required",
                  }}
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <div className="w-full">
                      <Input label="" value={value ?? ""} onChange={onChange} />
                      {errors.password && (
                        <div className="error">{errors.password.message}</div>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-evenly space-x-6 mt-2 ">
              <Checkbox borderColor="gray">Remember for 30 days</Checkbox>
              <Text className="font-bold hover:cursor-pointer">
                Forgot password?
              </Text>
            </div>

            <div className="space-y-2 mt-2">
              <Button
                className="w-full"
                colorScheme="facebook"
                onClick={() =>
                  trigger().then((isValid) => {
                    if (isValid) {
                      onSubmit(getValues());
                    }
                  })
                }
              >
                Sign in
              </Button>
              <Button
                leftIcon={<Icon as={FaGoogle} />}
                className="w-full"
                colorScheme="whiteAlpha"
                color="black"
                bg="gray"
              >
                Sign in with Google
              </Button>
              <Text>
                Don't have an account?{" "}
                <span className="text-black font-bold hover:cursor-pointer hover:text-blue-700 hover:underline hover:text-xl transition-all duration-500 ease-in-out">
                  Sign up for free
                </span>
              </Text>
            </div>
          </form>
        </div>
        <div className="flex-1 h-auto">
          <Image src={stockPhoto} objectFit="cover" />
        </div>
      </div>
    </div>
  );
};
