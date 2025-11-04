"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DetailPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      // If user not logged in, redirect to
      router.replace("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-lg font-medium">
        Loading user details...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-6">
      <main className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">
          User Details
        </h1>

        <div className="space-y-4 text-gray-700 dark:text-gray-200">
          <div>
            <span className="font-medium">Name:</span> <span>{user.name}</span>
          </div>
          <div>
            <span className="font-medium">Email:</span>{" "}
            <span>{user.email}</span>
          </div>
          <div>
            <span className="font-medium">Role:</span>{" "}
            <span className="capitalize">{user.role}</span>
          </div>
          {user.address && (
            <div>
              <span className="font-medium">Address:</span>{" "}
              <span>{user.address}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200"
        >
          Logout
        </button>
      </main>
    </div>
  );
}
