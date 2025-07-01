"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Header from "@/components/partials/Header";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, email, username, password, confirmPassword } = formData;

    if (!fullName || !email || !username || !password || !confirmPassword) {
      setStatusMessage("Please fill in all fields.");
      setIsSuccessful(false);
      return;
    }

    if (password !== confirmPassword) {
      setStatusMessage("Passwords do not match.");
      setIsSuccessful(false);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.message || "Something went wrong.");
        setIsSuccessful(false);
      } else {
        setStatusMessage("Your account has been created successfully!");
        setIsSuccessful(true);
        router.push("/sign/login");
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
      setIsSuccessful(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Icon Section */}
          <div className="bg-blue-100 flex flex-col justify-center items-center p-6 gap-4 w-full md:w-1/3">
            <Image src="/images/Brainicon.png" alt="E-DepCheck" width={80} height={80} />
            <h2 className="text-2xl font-bold text-[#2C1E4A] text-center">Join E-DepCheck</h2>
            <p className="text-sm text-center text-blue-900 px-2">"Your Mental Health Matters"</p>
          </div>

          {/* Right Form Section */}
          <div className="w-full md:w-2/3 p-6">
            <h1 className="text-xl font-semibold text-center text-[#2C1E4A] mb-4">Create an Account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input Group */}
              {[
                { icon: FaUser, name: "fullName", placeholder: "Full Name", type: "text" },
                { icon: FaEnvelope, name: "email", placeholder: "Email", type: "email" },
                { icon: FaUserTag, name: "username", placeholder: "Username", type: "text" },
              ].map(({ icon: Icon, ...input }) => (
                <div key={input.name} className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-300 transition">
                  <Icon className="text-blue-400 mr-3" />
                  <input
                    {...input}
                    value={(formData as any)[input.name]}
                    onChange={handleChange}
                    className="w-full outline-none text-sm bg-transparent"
                    required
                  />
                </div>
              ))}

              {/* Password */}
              <div className="flex items-center border rounded-md px-3 py-2 relative">
                <FaLock className="text-blue-400 mr-3" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full outline-none text-sm bg-transparent"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="flex items-center border rounded-md px-3 py-2 relative">
                <FaLock className="text-blue-400 mr-3" />
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full outline-none text-sm bg-transparent"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <p className={`text-sm ${isSuccessful ? "text-green-500" : "text-red-500"}`}>
                  {statusMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#2C1E4A] text-white py-2 rounded-md hover:bg-[#1f1532] transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-500">
              Already have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => router.push("/sign/login")}
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
