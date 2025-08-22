// theme.js
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    bg: Palette["primary"];
    border: Palette["primary"];
  }
  interface PaletteOptions {
    bg: PaletteOptions["primary"];
    border: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#6130C4",
      light: "#e3f2fd",
      dark: "#4e269d",
    },
    secondary: {
      main: "#ECE3FF",
      dark: "#D4C1FC",
      light: "#ECE3FF",
      contrastText: "#6131C4",
    },
    success: {
      light: "#a5dba7",
      main: "#378C3B",
      dark: "#215423",
    },
    error: {
      light: "#fbb4af",
      main: "#f44336",
      dark: "#a91409",
    },
    warning: {
      light: "#fbe9e7",
      main: "#ffab91",
      dark: "#d84315",
    },
    info: {
      light: "#80deea",
      main: "#00bcd4",
      dark: "#00838f",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    grey: {
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#101828",
    },
    bg: {
      main: "#F1F4F7",
      light: "#F1F4F7",
      dark: "#1B2333",
      contrastText: "#000000",
    },
    border: {
      main: "#6131C4",
      light: "#DCE4EC",
    },
    text: {
      primary: "#101828",
      secondary: "#475467",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Preferred font family
    h1: { fontSize: "72px", lineHeight: "90px", letterSpacing: "-0.02em" }, // display 2xl
    h2: { fontSize: "60px", lineHeight: "72px", letterSpacing: "-0.02em" }, // display xl
    h3: { fontSize: "48px", lineHeight: "60px", letterSpacing: "-0.02em" }, // display lg
    h4: { fontSize: "36px", lineHeight: "44px", letterSpacing: "-0.02em" }, // display md
    h5: { fontSize: "30px", lineHeight: "38px" }, // display sm
    h6: { fontSize: "24px", lineHeight: "32px" }, // display xs
    subtitle1: { fontSize: "20px", lineHeight: "30px" }, // text xl
    subtitle2: { fontSize: "18px", lineHeight: "28px" }, // text lg
    body1: { fontSize: "16px", lineHeight: "24px" }, // text md
    body2: { fontSize: "14px", lineHeight: "20px" }, // text sm
    caption: { fontSize: "12px", lineHeight: "18px" }, // text xs
  },
  spacing: 8, // Default spacing unit in pixels
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Custom border-radius for all buttons
        },
      },
    },
    // ... other component customizations
  },
});

export default theme;
