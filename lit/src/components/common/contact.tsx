import { ErrorResponse } from "@remix-run/router";
import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";

type Inputs = {
    name : string
    email : string
    message : string
}

const Contact: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState : {errors},
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    console.log(watch("email"))
  return (
    <div className="flex mt-100 flex-wrap justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex mt-20 ">
            <div>
                <input className="flex-grow mr-2 px-4 py-2 border border-gray-300 rounded-md" placeholder="Name" {...register("name", {required: "Please enter a name.", minLength : {value:2, message: "Name is too short."}})}/>
                <p>{errors.name?.message}</p>
            </div>
            <div>
                <input className="flex-grow mr-2 px-4 py-2 border border-gray-300 rounded-md" placeholder="Email" {...register("email", {required: "Please enter an email"})}/>
                <p>{errors.email?.message}</p>
            </div>
            <div>
                <input className="flex-grow mr-2 px-4 py-2 border border-gray-300 rounded-md" placeholder="Message" {...register("message", {required: "Please enter a message", minLength: {value: 4, message: "Message is too short."}})}/>
                <p>{errors.message?.message}</p>
            </div>
            <input className="px-4 py-2 bg-black text-white rounded-md" type="submit"/>
        </form>
    </div>
  );
};

export default Contact;