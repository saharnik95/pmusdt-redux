import { InputBase, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIconComponent from "@/components/icons/SearchIconComponent";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showSearchIcon?: boolean;
  height?: string | number;
}

const StyledInputBase = styled(InputBase)<{ $height?: string | number }>(
  ({ $height }) => ({
    "& .MuiInputBase-input": {
      width: "100%",
      color: "white",
      padding: "0 16px",
      paddingLeft: "40px",
      height: $height || "80px",
      backgroundColor: "#242C39",
      border: "none",
      borderRadius: "10px",
      "&::placeholder": {
        color: "white",
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "20.8px",
        opacity: 1,
      },
      "&:focus": {
        outline: "none",
        boxShadow: "0 0 0 2px var(--primary)",
      },
    },
    "& .MuiInputAdornment-root": {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
    },
  })
);

export default function Input({
  placeholder,
  value,
  onChange,
  showSearchIcon,
  height,
}: InputProps) {
  return (
    <StyledInputBase
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      startAdornment={
        showSearchIcon && (
          <InputAdornment position="start">
            <SearchIconComponent />
          </InputAdornment>
        )
      }
      $height={height}
    />
  );
}
