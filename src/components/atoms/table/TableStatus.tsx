import { Typography } from "@mui/material";

interface Props {
  textColor: string;
  bgColor: string;
  text: string;
}

const TableStatus: React.FC<Props> = ({ textColor, bgColor, text }) => {
  return (
    <Typography
      variant="TM"
      className="md:basis-[93px] rounded-[8px] flex justify-center items-center md:px-[10px] md:py-[8px] px-5 py-4"
      sx={{ color: textColor, backgroundColor: bgColor }}
    >
      {text}
    </Typography>
  );
};

export default TableStatus;
