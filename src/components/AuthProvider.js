// src/components/AuthProvider.js
import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

export default function AuthProvider({ children }) {
  const { accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      const account = accounts[0];
      const user = {
        name: account.name,
        email: account.username,
        _id: account.localAccountId || account.homeAccountId,
      };
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [accounts]);

  return children;
}
