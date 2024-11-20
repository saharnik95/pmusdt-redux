import { Typography, Link as MuiLink, Box } from "@mui/material";
import { Link } from "react-router-dom";

interface FormFooterProps {
  text: string;
  linkText: string;
  linkTo: string;
}

export default function FormFooter({
  text,
  linkText,
  linkTo,
}: FormFooterProps) {
  return (
    <Box sx={{ mt: 3, textAlign: "center" }}>
      <Typography variant="FI" sx={{ color: "#ABABAB" }}>
        {text}{" "}
        <MuiLink
          component={Link}
          to={linkTo}
          variant="FI"
          sx={{ color: "#1D8D94", textDecoration: "none" }}
        >
          {linkText}
        </MuiLink>
      </Typography>
    </Box>
  );
}
