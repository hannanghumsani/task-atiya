"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { checkAuth } from "../utils/authCheck";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer");
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAuth(router, true);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        {
          name,
          email,
          password,
          address: address || undefined, // optional
          role,
        }
      );

      const { token, user } = response.data;

      // Save token & role to localStorage
      //   localStorage.setItem("token", token);
      if (response.status) {
        router.push("/");
      }
      //   localStorage.setItem("role", user.role);

      setMessage(`Registration successful! Welcome ${user.name}`);

      // Navigate based on role
      //   if (user.role === "manager") {
      //     router.push("/details");
      //   } else {
      //     router.push("/detail");
      //   }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center justify-center bg-white dark:bg-neutral-900 p-10 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="w-full flex flex-col gap-4 text-gray-800 dark:text-gray-100"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
            />
          </div>

          {/* Address (optional) */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Address (optional)
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
            >
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
            {message}
          </p>
        )}
      </main>
    </div>
  );
}
