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
        <Typography variant="SH" className="text-form-fail">
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
            xs: "100px",
            md: "173px",
          },
          padding: {
            xs: "12px",
            md: "20px",
          },
          marginTop: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
          backgroundColor: (theme) => theme.palette.form.buttonBackground,
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
