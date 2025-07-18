import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button, Container, Typography } from "@mui/material";

export default function LoginPage() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ["user.read"],
    });
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login to Continue</Typography>
      <Button variant="contained" onClick={handleLogin}>
        Sign in with Microsoft
      </Button>
    </Container>
  );
}
