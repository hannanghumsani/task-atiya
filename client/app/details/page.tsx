// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { checkAuth } from "../utils/authCheck"; // adjust path

// export default function DetailsPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const { token, role }: any = checkAuth(router);

//     // If not logged in, redirect to login
//     if (!token) {
//       router.replace("/login");
//     }

//     // If not manager, redirect to detail
//     // else if (role !== "manager") {
//     //   router.replace("/detail");
//     // }
//   }, []);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <h1 className="text-2xl font-semibold">Manager Details Page</h1>
//     </div>
//   );
// }

import React from "react";
import Detail from "../components/details";

function page() {
  return <Detail />;
}

export default page;
