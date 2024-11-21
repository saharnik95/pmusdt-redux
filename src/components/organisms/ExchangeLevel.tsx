import { Button } from "@mui/material";
import ExchangeLevelDiv from "../molecules/exchangeLevel/ExchangeLevelDiv";

export default function ExchangeLevel() {
  return (
    <div className="relative flex flex-col w-full items-center">
      {/* Top ExchangeLevelDiv */}
      <ExchangeLevelDiv />

      {/* Spacer to create 27px space */}
      <div className="relative" style={{ height: "27px" }}>
        <div
          className="absolute top-1/2 left-1/2 w-[69px] h-[69px] rounded-full bg-primary-background flex justify-center items-center z-10"
          style={{
            transform: "translate(-50%, -50%)", // Center horizontally and vertically
          }}
        >
          <img src="/flash.png" alt="flash" />
        </div>
      </div>

      {/* Bottom ExchangeLevelDiv */}
      <ExchangeLevelDiv />

      {/* Button */}
      <Button
        sx={{
          marginTop: "27px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
          backgroundColor: "#1D8D94",
          width: "560px",
        }}
        variant="contained"
        type="submit"
      >
        Make Exchange
      </Button>
    </div>
  );
}
