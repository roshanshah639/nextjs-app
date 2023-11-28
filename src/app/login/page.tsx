"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
      console.log("Login Success", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl mb-4">{loading ? "Processing..." : "Login"} </h1>

      {/* Email */}
      <label className="block mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="border border-gray-300 p-2 rounded-md mb-4"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      {/* Password */}
      <label className="block mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="border border-gray-300 p-2 rounded-md mb-4"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 
        rounded-md focus:outline-none focus:ring-2
         focus:bg-blue-600 focus:ring-blue-600"
        onClick={onLogin}
        type="submit"
      >
        Login
      </button>
      <p className="mt-4">
        New to website ?{" "}
        <Link className="text-blue-600" href="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
