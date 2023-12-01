"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post(`/api/users/verifyemail`, { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      <h1 className="text-3xl font-bold text-gray-800">Verify your email</h1>
      <h2 className="text-2xl p-2 bg-orange-500 mt-4">
        {token ? `${token}` : "Token not found"}
      </h2>

      {verified && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl">Email verified successfully</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
