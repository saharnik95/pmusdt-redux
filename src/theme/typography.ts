import { TypographyOptions } from "@mui/material/styles/createTypography";
import { CSSObject } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    LM: CSSObject;
    MM: CSSObject;
    FM: CSSObject;
    FB: CSSObject;
    FI: CSSObject;
    TB: CSSObject;
    FH: CSSObject;
    FT: CSSObject;
    FR: CSSObject;
  }

  interface TypographyVariantsOptions {
    LM?: CSSObject;
    MM?: CSSObject;
    FM?: CSSObject;
    FB: CSSObject;
    FI: CSSObject;
    TB: CSSObject;
    FH: CSSObject;
    FT: CSSObject;
    FR: CSSObject;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    LM: true;
    MM: true;
    FM: true;
    FB: true;
    FI: true;
    TB: true;
    FH: true;
    FT: true;
    FR: true;
  }
}

const typography: TypographyOptions = {
  LM: {
    fontFamily: ' "Russo One", sans-serif',
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "24.1px",
    letterSpacing: "0.2em",
    "@media (min-width:600px)": {
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "24.1px",
      letterSpacing: "0.2em",
    } as CSSObject,
  },
  MM: {
    fontFamily: ' "Niramit", sans-serif',
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "20.8px",
    "@media (min-width:600px)": {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "20.8px",
    } as CSSObject,
  },
  FM: {
    fontFamily: ' "Niramit", sans-serif',
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "15.6px",
    "@media (min-width:600px)": {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "15.6px",
    } as CSSObject,
  },
  FB: {
    fontFamily: ' "Niramit", sans-serif',
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "36.8px",
    "@media (min-width:600px)": {
      fontSize: "36px",
      fontWeight: 700,
      lineHeight: "46.8px",
    } as CSSObject,
  },
  FI: {
    fontFamily: ' "Niramit", sans-serif',
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "14.8px",
    "@media (min-width:600px)": {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "20.8px",
    } as CSSObject,
  },

  TB: {
    fontFamily: ' "Niramit", sans-serif',
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "14.8px",
    "@media (min-width:600px)": {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "18.2px",
    } as CSSObject,
  },

  FH: {
    fontFamily: ' "Niramit", sans-serif',
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "31px",
    "@media (min-width:600px)": {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "31px",
    } as CSSObject,
  },
  FT: {
    fontFamily: ' "Niramit", sans-serif',
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "26px",
    "@media (min-width:600px)": {
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "26px",
    } as CSSObject,
  },
  FR: {
    fontFamily: ' "Niramit", sans-serif',
    fontSize: "16px",
    fontWeight: 300,
    lineHeight: "29px",
    "@media (min-width:600px)": {
      fontSize: "16px",
      fontWeight: 300,
      lineHeight: "29px",
    } as CSSObject,
  },
};

export default typography;
