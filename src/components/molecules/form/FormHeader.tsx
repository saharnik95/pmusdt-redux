import { Typography, Box } from "@mui/material";

interface FormHeaderProps {
  title: string;
  subtitle?: string;
}

export default function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        component="h1"
        variant="FB"
        align="center"
        className="text-primary-foreground text-center font-niramit  text-transparent bg-clip-text bg-gradient-to-r from-[#1D8D94] to-[#99D9A6]
         hidden md:flex"
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
