import { Divider, Typography } from "@mui/material";

export default function Footer() {
  return (
    <div className=" w-full  bottom-0  flex flex-col justify-center   lg:pb-4 md:px-8 md:pb-3 px-4 pb-2 max-w-[1140px] xl:px-0 xl:mx-auto  ">
      <Divider
        orientation="horizontal"
        sx={{ width: "100%", backgroundColor: "#ABABAB", mb: "18px" }}
      />
      <Typography className="text-footer-text text-center">
        Copyright © 2024 repayment. All rights reserved.
      </Typography>
    </div>
  );
}
