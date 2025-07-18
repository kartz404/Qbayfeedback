import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
const { instance } = useMsal();
const navigate = useNavigate();

useEffect(() => {
const handleAuth = async () => {
try {
const response = await instance.handleRedirectPromise();
    let account = null;

    if (response) {
      account = response.account;
      instance.setActiveAccount(account);
    } else {
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        account = accounts[0];
        instance.setActiveAccount(account);
      }
    }

    if (account) {
      await axios.post("http://localhost:5000/api/auth/microsoft", {
        name: account.name,
        email: account.username,
        microsoftId: account.localAccountId,
      });

      console.log("✅ Logged in:", account.name);
      navigate("/"); // <-- Update this if your homepage is named differently
    } else {
      console.warn("No account found after redirect.");
      navigate("/"); // fallback to login
    }
  } catch (err) {
    console.error("Auth Error:", err);
    navigate("/home"); // fallback to login
  }
};

handleAuth();
}, [instance, navigate]);

return <p>Signing in...</p>;
}