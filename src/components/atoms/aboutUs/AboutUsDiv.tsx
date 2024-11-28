import { Typography } from "@mui/material";

interface AboutUsDivProps {
  title: string;
  description: string;
}

export default function AboutUsDiv({ title, description }: AboutUsDivProps) {
  return (
    <div className="lg:p-[42px] md:p-[32px] p-[22px]  lg:w-[657px] border-[#2E3E59] border-[1px] rounded-[30px] flex flex-col">
      <Typography variant="SH" className="text-white">
        {title}
      </Typography>
      <Typography variant="PH" className="text-footer-text">
        {description}
      </Typography>
    </div>
  );
}
