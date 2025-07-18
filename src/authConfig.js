export const msalConfig = {
  auth: {
    clientId: "28a1b27d-32d6-467d-9635-accf432bd78f", // Replace with your Azure AD app client ID
    authority: "https://login.microsoftonline.com/common", // or your tenant-specific URL
    redirectUri: "http://localhost:3000/auth/callback", // Must match redirect URI in Azure portal
  },
  cache: {
    cacheLocation: "localStorage", // or sessionStorage
    storeAuthStateInCookie: false,
  },
};
