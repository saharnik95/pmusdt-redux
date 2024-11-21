import { Divider, Input, Typography } from "@mui/material";
2;
export default function ExchangeLevelDiv() {
  return (
    <div className="bg-form-background rounded-[30px] w-[560px] px-9 py-10">
      <Typography variant="FI" className="text-footer-text">
        From :
      </Typography>
      <div className="w-full flex justify-center bg-primary-background rounded-[10px] px-4 py-2 gap-2 mt-5">
        <Input
          placeholder="1000"
          disableUnderline
          className="w-full text-white"
          sx={{
            color: "white", // Text color of the input
            "&::placeholder": {
              color: "white", // Change the placeholder text color
              fontSize: "14px", // Adjust the font size
              fontWeight: 700,
              lineHeight: "18.2px",
            },
            "& input::placeholder": {
              color: "white", // Change the placeholder text color
              fontSize: "14px", // Adjust the font size
              fontWeight: 700,
              lineHeight: "18.2px",
            },
            "& input": {
              border: "none", // Ensure no borders are present
              outline: "none", // Remove outline
            },
          }}
        />
        <Divider
          orientation="vertical"
          sx={{
            width: "1px",
            height: "38px",
            backgroundColor: "#596B89",
          }}
        />
        <div className="flex w-full items-center gap-2 ">
          <img src="/tether.png" className="w-6 h-6" />
          <Typography className="text-[#979E9C]">USDT(TRC20)</Typography>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Typography className="text-footer-text" variant="TB">
          Min : $100{" "}
        </Typography>
        <Typography className="text-footer-text" variant="TB">
          {" "}
          Max: $4832{" "}
        </Typography>
      </div>
    </div>
  );
}
