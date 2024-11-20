import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <div className=" w-full bottom-0  flex justify-center mt-[114px]   lg:py-4 md:px-12 md:py-3 px-4 py-2 max-w-[1024px] mx-auto border-t-[1px] border-footer-border ">
      <Typography className="text-footer-text">
        Copyright © 2024 repayment. All rights reserved.
      </Typography>
    </div>
  );
}
