import { useMsal } from "@azure/msal-react";

const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ["user.read"],
    });
  };

  return <button onClick={handleLogin}>Login with Microsoft</button>;
};

export default SignInButton;
