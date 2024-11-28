import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    FI: React.CSSProperties;
    // Add other custom variants here
    LM: React.CSSProperties;
    MM: React.CSSProperties;
    FM: React.CSSProperties;
    TM: React.CSSProperties;
    TH: React.CSSProperties;
    FB: React.CSSProperties;
    TB: React.CSSProperties;
    FH: React.CSSProperties;
    FT: React.CSSProperties;
    FR: React.CSSProperties;
    SH: React.CSSProperties;
    SB: React.CSSProperties;
    PH: React.CSSProperties;
    UH: React.CSSProperties;
    QB: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    FI?: React.CSSProperties;
    // Add other custom variants here
    LM?: React.CSSProperties;
    MM?: React.CSSProperties;
    FM?: React.CSSProperties;
    TM?: React.CSSProperties;
    TH?: React.CSSProperties;
    FB?: React.CSSProperties;
    TB?: React.CSSProperties;
    FH?: React.CSSProperties;
    FT?: React.CSSProperties;
    FR?: React.CSSProperties;
    SH?: React.CSSProperties;
    SB?: React.CSSProperties;
    PH: React.CSSProperties;
    UH: React.CSSProperties;
    QB: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    FI: true;
    // Add other custom variants here
    LM: true;
    MM: true;
    FM: true;
    TM: true;
    TH: true;
    FB: true;
    TB: true;
    FH: true;
    FT: true;
    FR: true;
    SH: true;
    SB: true;
    PH: true;
    UH: true;
    QB: true;
  }
}
