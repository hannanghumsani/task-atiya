// utils/authCheck.js
export const checkAuth = (router, redirectIfAuthenticated = false) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  // If logged in and visiting login/register → redirect
  if (redirectIfAuthenticated && token) {
    router.replace(role === "manager" ? "/details" : "/detail");
    return true;
  }

  return { token, role };
};
