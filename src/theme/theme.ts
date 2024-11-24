import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    form: {
      background: string;
      input: string;
      buttonBackground: string;
      fail: string;
    };
    footer: {
      border: string;
      text: string;
    };
  }

  interface PaletteOptions {
    form?: {
      background: string;
      input: string;
      buttonBackground: string;
      fail: string;
    };
    footer: {
      border: string;
      text: string;
    };
  }
}
const theme = createTheme({
  typography,
  palette: {
    footer: {
      border: "#2E3E59",
      text: "#ABABAB",
    },
    form: {
      background: "#2A3342",
      input: "#242C39",
      buttonBackground: "#1D8D94",
      fail: "#F66066",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: 0,
          textTransform: "none",
          minWidth: "auto",
        },
      },
    },
  },
});

export default theme;
