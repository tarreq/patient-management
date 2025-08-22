import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Layout: React.FC = () => {
  return (
    <Box display="flex" height="100%">
      <Box
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100%",
          zIndex: 1200,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        flexGrow={1}
        sx={{
          overflowX: "hidden",
          marginLeft: "280px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
