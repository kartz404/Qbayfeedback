import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "28a1b27d-32d6-467d-9635-accf432bd78f",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000/auth/callback", // must match Azure config
  },
  cache: {
    cacheLocation: "localStorage", // persists login session
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
