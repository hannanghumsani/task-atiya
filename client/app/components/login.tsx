"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { checkAuth } from "../utils/authCheck"; // adjust path if needed

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAuth(router, true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        { email, password }
      );

      const { token, user } = response.data;

      // 🟢 Save *all user details* in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // save full user object
      localStorage.setItem("role", user.role);

      setMessage(`Welcome ${user.name}!`);

      // 🟢 Navigate based on role
      if (user.role === "manager") {
        router.push("/details");
      } else {
        router.push("/detail");
      }
    } catch (error) {
      // setMessage(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center text-black">
      <main className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-xl mb-4">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-600 text-white p-2 rounded">Login</button>
        </form>
        {message && <p className="text-red-500 mt-3">{message}</p>}
      </main>
    </div>
  );
}
