import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Layout: React.FC = () => {
  return (
    <Box display="flex" height="100%">
      <Sidebar />
      <Box component="main" flexGrow={1} sx={{ overflowX: "hidden" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
