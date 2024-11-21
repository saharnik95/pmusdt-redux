import { Button, Checkbox, Divider, Typography } from "@mui/material";
import React from "react";
import ConfirmLevelrules from "../molecules/home/ConfirmLevelrules";
import ConfirmEmail from "../molecules/confirmLevel/ConfirmEmail";

export default function ConfirmLevel() {
  return (
    <div className="w-full flex-col justify-between bg-form-background rounded-[30px] lg:gap-36 lg:py-12 md:gap-8 gap-4 md:px-20 md:py-6 px-4 py-6 max-w-[1140px] lg:mx-auto">
      <Typography variant="FH" className="text-white">
        Invoice Details :
      </Typography>
      <div className="flex flex-row justify-between lg:mt-[43px]">
        <Typography variant="FT" className="text-footer-text">
          Send :{" "}
        </Typography>
        <Typography variant="FT" className="text-white">
          100usdt
        </Typography>
      </div>
      <div className="flex flex-row justify-between lg:mt-4">
        <Typography variant="FT" className="text-footer-text">
          Receive :{" "}
        </Typography>
        <Typography variant="FT" className="text-white">
          120 perfect money
        </Typography>
      </div>
      <Divider
        orientation="horizontal"
        sx={{ width: "814px", backgroundColor: "#596B89", mx: 1, mt: "34px" }} // Add horizontal margin for spacing
      />
      <ConfirmEmail />
      <ConfirmLevelrules />

      <div className="flex flex-row mt-8">
        <Checkbox
          sx={{
            padding: 0,
            color: "#242C39",
            "&.Mui-checked": {
              color: "#1D8D94",
              backgroundColor: "",
            },
          }}
        />
        <Typography variant="FR" className="text-white">
          I Agree With the <span className="text-[#60A7F8]">AML policy</span>{" "}
          and <span className="text-[#60A7F8]">User Agreement. </span>{" "}
        </Typography>
      </div>
      <div className="w-ful flex justify-center">
        <Button
          sx={{
            marginTop: "42px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
            backgroundColor: "#1D8D94",
          }}
          variant="contained"
          className="w-[560px] align-middle"
          type="submit"
        >
          confirm
        </Button>
      </div>
    </div>
  );
}
