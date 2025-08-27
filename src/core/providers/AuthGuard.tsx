import supabase from "./supabase";
import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  } else if (authenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthGuard;
