import { Button, Typography } from "@mui/material";

const MenuItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <a color="inherit" href={href}>
    <Typography
      className="text-primary-foreground"
      variant="MM"
      sx={{
        textTransform: "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Typography>
  </a>
);

export default MenuItem;
