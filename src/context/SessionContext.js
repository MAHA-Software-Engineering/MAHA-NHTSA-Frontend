import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const idToken = localStorage.getItem("idToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // MQ: Please keep these console.log statements for debugging purposes
    // console.log("Access Token:", accessToken);
    // console.log("ID Token:", idToken);
    // console.log("Refresh Token:", refreshToken);

    if (accessToken && idToken && refreshToken) {
      const user = JSON.parse(localStorage.getItem("cognitoUser"));
      setSession({ user });
      setIsLoading(false);
    } else {
      setSession(null);
      setIsLoading(false);
    }
  }, []);

  const signIn = () => {
    router.push("/login");
  };

  return (
    <SessionContext.Provider value={{ session, setSession, signIn, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};
