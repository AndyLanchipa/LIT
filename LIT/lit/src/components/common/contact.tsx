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
    <div className="flex-wrap justify-center items-center">
        <div className="mt-10">
            <p className="text-5xl font-bold text-teal-500">LIT</p>
            <p className="text-sm text-gray-500 mt-5 mx-40 px-40">
                The contact page serves as a convenient platform for users to get in touch with us.
                Whether it's a question, feedback, or collaboration opportunity, we welcome any form of communication. 
                Fill out the simple contact form with your name, email, and message, and we'll make sure to respond as soon as possible. 
                Your input is valuable to us, and we look forward to hearing from you!
            </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center mt-10">
            <div>
                <input className="flex-grow mr-2 px-4 py-2 border-b border-gray-300 hover:border-b-2 hover:border-teal-500 transition-all duration-300 focus:border-teal-500" placeholder="Name" {...register("name", {required: "Please enter a name.", minLength : {value:2, message: "Name is too short."}})}/>
                <p>{errors.name?.message}</p>
            </div>
            <div>
                <input className="flex-grow mr-2 px-4 py-2 border-b border-gray-300 hover:border-b-2 hover:border-teal-500 transition-all duration-300 focus:border-teal-500" placeholder="Email" {...register("email", {required: "Please enter an email"})}/>
                <p>{errors.email?.message}</p>
            </div>
            <div>
                <input className="flex-grow mr-2 px-4 py-2 border-b border-gray-300 hover:border-b-2 hover:border-teal-500 transition-all duration-300 focus:border-teal-500" placeholder="Message" {...register("message", {required: "Please enter a message", minLength: {value: 4, message: "Message is too short."}})}/>
                <p>{errors.message?.message}</p>
            </div>
        </form>
        <input className="px-4 py-2 bg-teal-500 text-white rounded-md mt-5 hover:bg-teal-600" type="submit"/>
    </div>
  );
};

export default Contact;