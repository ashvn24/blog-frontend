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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserLogin } from "../Services/Services";
import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //   Validation
  const validation = () => {
    if (form.email.trim() === "") {
      toast.error("email should not be empty");
      return false;
    } else if (!isValidEmail(form.email.trim())) {
      toast.warning("enter a valid email");
      setForm({ email: "" });
      return false;
    } else if (form.password.trim() === "") {
      toast.error("password should not be empty");
      return false;
    }
    return true;
  };

  function isValidEmail(email) {
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  }

  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    if (validation()) {
      UserLogin(form).then((res) => {
        if (res.status === 200) {
          const token = JSON.stringify(res.data);
          localStorage.setItem("token", token);
          const decoded = jwtDecode(token);
          console.log(decoded);
          if (decoded.user_data.is_completed) {
            navigate("/user/homepage/ ");
          } else {
            navigate("/user/choosepreference/ ");
          }
        } else {
          toast.error(
            "invalid login credentials please verify your email and password "
          );
        }
      });
    }
  };

  return (
    <div
      className="bg-cover bg-fixed  h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20210706/pngtree-green-abstract-backgrounds-4k-hd-free-dowunlode-pngtree-image_737768.jpg')`,
      }}
    >
      <Card shadow={true} className="border bg-opacity-60 px-10 py-20 sm:py-10">
        <Typography
          className="flex justify-center"
          variant="h4"
          color="blue-gray"
        >
          Login To Your Account{" "}
        </Typography>
        <form
          className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96"
          onSubmit={FormHandlerLogin}
        >
          <div className="mb-1 flex flex-col gap-6">
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
            <Input
              type="password"
              variant="standard"
              label="Password"
              name="password"
              value={form.password}
              id="password"
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
              }}
            />
          </div>

          <div className="flex justify-center mt-8 items-center">
            <button
              type="submit"
              className="font-bold text border border-gray-600 rounded-full px-4 py-2 sm:px-6 sm:py-2 bg-white text-black hover:bg-black hover:text-white transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an accoount ?
            <a
              onClick={() => navigate("/signup")}
              className="font-medium text-gray-900 hover:underline"
            >
              Register
            </a>
          </Typography>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
