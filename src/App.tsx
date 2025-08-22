import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./core/router/routes";
import theme from "./core/theme/theme";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
