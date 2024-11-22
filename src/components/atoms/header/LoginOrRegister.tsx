import { Button, Typography } from "@mui/material";

const LoginOrRegister = ({ label }: { label: string }) => (
  <div className="flex">
    <Button
      color="inherit"
      sx={{
        padding: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography
        className="text-primary-foreground"
        variant="MM"
        sx={{
          textTransform: "none",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>
    </Button>
  </div>
);

export default LoginOrRegister;
