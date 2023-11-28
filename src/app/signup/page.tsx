"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);

      console.log("Signup Success", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log("Singup Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl mb-4">{loading ? "Processing..." : "Signup"} </h1>

      {/* Username */}
      <label className="block mb-2" htmlFor="username">
        Username
      </label>
      <input
        className="border border-gray-300 p-2 rounded-md mb-4"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />

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
        password
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
        onClick={onSignup}
        type="submit"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <p className="mt-4">
        Already have an account?{" "}
        <Link className="text-blue-600" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
