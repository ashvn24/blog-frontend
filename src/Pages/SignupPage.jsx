import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserLogin } from "../Services/Services";

function SignupPage() {
  const navigate = useNavigate();
  //  Validation
  const [pass, setPass] = useState({ cpassword: "", check: true });
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    dob: "",
  });

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const validateForm = () => {
    if (form.username.trim() === "") {
      toast.error("User Name should not be empty");
      return false;
    } else if (form.first_name.trim() === "") {
      toast.error("First Name should not be empty");
      return false;
    } else if (form.last_name.trim() === "") {
      toast.error("Last Name should not be empty");
      return false;
    } else if (form.phone.trim() === "") {
      toast.error("Phone number should not be empty");
      return false;
    } else if (form.phone.trim().length !== 10) {
      toast.error("Phone number should be exact 10 digits");
      return false;
    } else if (form.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!isValidEmail(form.email.trim())) {
      setForm({ email: "" });
      toast.error("Enter a valid Email");
      return false;
    } else if (form.dob.trim() === "") {
      toast.error("Date of birth should not be empty");
      return false;
    } else if (form.password.trim() === "") {
      toast.error("Password should not be empty");
      return false;
    } else if (form.password.trim().length < 6) {
      toast.warn("Password should be at least 6 characters");
      return false;
    } else if (pass.cpassword === "") {
      toast.error("Confirm Password should not be empty");
      return false;
    } else if (form.password !== pass.cpassword) {
      toast.error("Password didn't match");
      return false;
    } else if (!pass.check) {
      toast.error("Checkbox should be checked");
      return false;
    }
    return true;
  };

  const FormHandlerSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/' + "/accounts/register/",
          form // The data object
        );

        console.log(response.data);

        setForm({
          username: "",
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          password: "",
          dob: "",
        });
        setPass({ cpassword: "", check: true });
        toast.success("Account Created Successfully , Coninue to Login page!");
      } catch (error) {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          console.log(errorData, "anzil");
          if (errorData.email) {
            toast.error(errorData.email[0]);
          }else if(errorData.phone){
            toast.error(errorData.phone[0]);
          }
        } else {
          toast.error("An error occurred during registration.");
        }
      }
    }
  };

  return (
    <div
      className="bg-cover bg-fixed min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20210706/pngtree-green-abstract-backgrounds-4k-hd-free-dowunlode-pngtree-image_737768.jpg')`,
      }}
    >
      <Card
        shadow={true}
        className="border w-full md:w-2/3 lg:w-1/2 bg-opacity-60 px-6 sm:px-10 py-10 sm:py-20"
      >
        <Typography
          className="flex justify-center"
          variant="h4"
          color="blue-gray"
        >
          Register your Account
        </Typography>
        <form
          className="mt-8 mb-2 w-full max-w-screen-lg"
          onSubmit={FormHandlerSignup}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <Input
                variant="standard"
                label="First Name"
                name="first_name"
                value={form.first_name}
                id="first_name"
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.value });
                }}
              />
              <Input
                variant="standard"
                label="Username"
                name="username"
                value={form.username}
                id="username"
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col gap-6">
              <Input
                variant="standard"
                label="Last Name"
                name="last_name"
                value={form.last_name}
                id="last_name"
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.value });
                }}
              />
              <Input
                variant="standard"
                label="Email"
                name="email"
                value={form.email}
                id="email"
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col gap-6">
              <Input
                variant="standard"
                label="Phone"
                type="number"
                name="phone"
                value={form.phone}
                id="phone"
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.value });
                }}
              />
              <Input
                variant="standard"
                label="Password"
                type="password"
                name="password"
                value={form.password}
                id="password"
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col gap-6">
              <Input
                variant="standard"
                label="Date Of Birth"
                type="date"
                name="dob"
                value={form.dob}
                id="dob"
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.value });
                }}
              />
              <Input
                variant="standard"
                label="Confirm Password"
                type="password"
                name="cpassword"
                value={pass.cpassword}
                id="cpassword"
                onChange={(e) => {
                  setPass({ ...pass, [e.target.name]: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center mt-8">
            <button
              type="submit"
              className="font-bold text border border-gray-600 rounded-full px-4 py-2 sm:px-6 sm:py-2 bg-white text-black hover:bg-black hover:text-white transition duration-300 ease-in-out"
            >
              Register
            </button>

            <Typography color="gray" className="mt-4 text-center font-normal">
              Already Have an Account ?
              <a
                onClick={() => navigate("/")}
                className="font-medium text-gray-900 hover:underline"
              >
                Login
              </a>
            </Typography>
          </div>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default SignupPage;
