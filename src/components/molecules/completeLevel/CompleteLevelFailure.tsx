import BigCrossIconComponent from "@/components/icons/BigCrossIconComponent";
import { Button, Typography } from "@mui/material";
interface CompleteLevelFailureProps {
  onRestart: () => void; // Add the onRestart function type
}
export default function CompleteLevelFailure({
  onRestart,
}: CompleteLevelFailureProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-[68px]">
      <div className="flex gap-4 justify-center items-center">
        <span>
          <BigCrossIconComponent className="w-3 h-3 md:w-[40px] md:h-[40px]" />
        </span>
        <Typography variant="SH" className="text-[#F66066]">
          Your Payment Time Has Expired !{" "}
        </Typography>
      </div>

      <div className="mt-[28px] flex items-center justify-center">
        <Typography
          variant="FT"
          className="text-footer-text text-center text-nowrap"
        >
          Please Complete The Payment Process Again
        </Typography>
      </div>

      <Button
        sx={{
          width: {
            xs: "100px", // small screens (extra small and up)
            md: "173px", // medium screens and up
          },
          padding: {
            xs: "12px", // small screens (extra small and up)
            md: "20px", // medium screens and up
          },
          marginTop: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
          backgroundColor: "#1D8D94",
        }}
        variant="contained"
        type="submit"
        onClick={onRestart}
      >
        Try Again
      </Button>
    </div>
  );
}
