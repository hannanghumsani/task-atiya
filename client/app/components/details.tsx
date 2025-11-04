"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DetailPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addressInputs, setAddressInputs] = useState({});

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log(role);

    fetchUsers();
  }, [router]);

  const handleAddressChange = (id, value) => {
    setAddressInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveAddress = async (id) => {
    const token = localStorage.getItem("token");
    const newAddress = addressInputs[id];

    if (!newAddress?.trim()) return alert("Please enter an address.");

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}/address`,
        { address: newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        await fetchUsers();
        alert("Address saved successfully!");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address");
    }
  };

  const handleView = (id) => {
    const user = users.find((u) => u._id === id);
    if (user) {
      alert(
        `User Details:\n\nName: ${user.name || "N/A"}\nEmail: ${
          user.email
        }\nAddress: ${user.address || "N/A"}`
      );
    } else {
      alert("User not found!");
    }
  };
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-lg font-medium">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 font-sans">
      <main className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            All Users
          </h1>
          <button
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
          >
            Logout
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-neutral-800">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-3">{user.name || "N/A"}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {user.address ? (
                      user.address
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter address"
                        value={addressInputs[user._id] || ""}
                        onChange={(e) =>
                          handleAddressChange(user._id, e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-1.5 bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {!user.address && (
                      <button
                        onClick={() => handleSaveAddress(user._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm transition-all"
                      >
                        Save
                      </button>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleView(user._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm transition-all"
                    >
                      view
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
