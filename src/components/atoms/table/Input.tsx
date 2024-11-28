import { InputBase, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIconComponent from "@/components/icons/SearchIconComponent";

interface InputProps {
  placeholder?: string;
  value?: string; // Controlled value
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  showSearchIcon?: boolean; // New prop to control visibility of the search icon
}

const StyledInputBase = styled(InputBase)(({}) => ({
  "& .MuiInputBase-input": {
    width: "100%",
    color: "white",
    padding: "20px 16px",
    paddingLeft: "40px",
    maxHeight: "57px",
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
}));

export default function Input({
  placeholder,
  value,
  onChange,
  showSearchIcon,
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
    />
  );
}
