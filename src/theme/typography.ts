import { createTheme } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const theme = createTheme();

const createResponsiveTypography = (
  base: Record<string, any>,
  responsive: Partial<Record<string, any>> = {}
) => ({
  ...base,
  [theme.breakpoints.up("md")]: responsive,
});

const typography: TypographyOptions = {
  fontFamily: '"Niramit", sans-serif',
  LM: createResponsiveTypography(
    {
      fontFamily: '"Russo One", sans-serif',
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.25,
      letterSpacing: "0.1em",
    },
    {
      fontSize: "20px",
      lineHeight: 1.2,
      letterSpacing: "0.2em",
    }
  ),
  MM: createResponsiveTypography({
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: 1.3,
  }),
  FM: createResponsiveTypography({
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: 1.3,
  }),
  TM: createResponsiveTypography(
    {
      fontSize: "10px",
      fontWeight: 700,
      lineHeight: 1.26,
    },
    {
      fontSize: "12px",
      lineHeight: 1.3,
    }
  ),
  TH: createResponsiveTypography(
    {
      fontSize: "12px",
      fontWeight: 700,
      lineHeight: 1.23,
    },
    {
      fontSize: "14px",
      lineHeight: 1.3,
    }
  ),
  FB: createResponsiveTypography(
    {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: 1.53,
    },
    {
      fontSize: "36px",
      lineHeight: 1.3,
    }
  ),
  FI: createResponsiveTypography(
    {
      fontFamily: '"Niramit", sans-serif',
      fontSize: "12px",
      fontWeight: 700,
      lineHeight: 1.23,
    },
    {
      fontSize: "16px",
      lineHeight: 1.3,
    }
  ),
  TB: createResponsiveTypography(
    {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.23,
    },
    {
      fontSize: "14px",
      lineHeight: 1.3,
    }
  ),
  FH: createResponsiveTypography(
    {
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: 1.22,
    },
    {
      fontSize: "24px",
      lineHeight: 1.29,
    }
  ),
  PH: createResponsiveTypography(
    {
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: 1.22,
    },
    {
      fontSize: "18px",
      lineHeight: 1.29,
    }
  ),
  FT: createResponsiveTypography(
    {
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: 1.33,
    },
    {
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: 1.3,
    }
  ),
  FR: createResponsiveTypography(
    {
      fontSize: "12px",
      fontWeight: 300,
      lineHeight: 1.17,
    },
    {
      fontSize: "16px",
      lineHeight: 1.81,
    }
  ),
  SH: createResponsiveTypography(
    {
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: 1.4,
    },
    {
      fontSize: "32px",
      lineHeight: 1.31,
    }
  ),
  SB: createResponsiveTypography(
    {
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "-0.1px",
    },
    {
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: 2,
    }
  ),
  UH: createResponsiveTypography(
    {
      fontSize: "30px",
      fontWeight: 700,
      lineHeight: "77PX",
    },
    {
      fontSize: "48px",
      fontWeight: 700,
      lineHeight: 2,
    }
  ),

  QB: createResponsiveTypography(
    {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "16",
    },
    {
      fontSize: "16px",
      lineHeight: "20.8px",
    }
  ),
};

export default typography;
