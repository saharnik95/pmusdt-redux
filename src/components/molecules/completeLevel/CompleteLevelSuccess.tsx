import TickIconComponent from "@/components/icons/TickIconComponent";
import { Typography } from "@mui/material";

export default function CompleteLevelSuccess() {
  const exchangeProcessSteps = [
    {
      id: 1,
      label: "E- Voucher :",
      text: "2326564925",
    },
    {
      id: 3,
      label: "Amount :",
      text: "100 USDT",
    },
    { id: 2, label: "Activation Code :", text: "9012037427092330" },
    { id: 4, label: "Time & Date :", text: "25-02-2023, 13:22:16" },
  ];

  return (
    <div className="flex flex-col mt-8 md:mt-[68px]">
      <div className="flex gap-2 md:gap-4 justify-center items-center">
        <span className="flex-shrink-0">
          <TickIconComponent />
        </span>
        <Typography variant="SH" className="text-[#40A578] text-center">
          payment success !
        </Typography>
      </div>
      <div className="mt-4 md:mt-[28px] flex items-center justify-center">
        <Typography
          variant="FT"
          className="text-footer-text text-center"
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "18px" },
            lineHeight: 1.5,
          }}
        >
          The Transaction Was Successfully Completed And The Amount Of 100
          Tether Was Deposited To This Address
        </Typography>
      </div>

      <div className="mt-4 md:mt-8">
        {exchangeProcessSteps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col sm:flex-row mt-4 md:mt-[18px] items-start sm:items-center justify-between"
          >
            <Typography
              variant="FT"
              className="text-footer-text mb-2 sm:mb-0 sm:w-1/4"
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.5,
              }}
            >
              {step.label}
            </Typography>
            <div className="bg-primary-background w-full sm:w-3/4 rounded-[10px] px-3 py-3 md:px-4 md:py-[18px]">
              <Typography
                variant="MM"
                className="text-white break-all"
                sx={{
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  lineHeight: 1.5,
                }}
              >
                {step.text}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
