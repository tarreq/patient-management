// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "./core/theme/theme";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./core/router/routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
