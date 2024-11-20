import { createTheme } from "@mui/material/styles";
import typography from "./typography"; // Assuming you have a typography.js file

const theme = createTheme({
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640, // Tailwind sm
      md: 768, // Tailwind md
      lg: 1024, // Tailwind lg
      xl: 1280, // Tailwind xl
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
