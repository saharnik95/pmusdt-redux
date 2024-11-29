import AbouUsAccordion from "@/components/atoms/aboutUs/AbouUsAccordion";
import Button from "@/components/atoms/form/Button";
import Input from "@/components/atoms/table/Input";
import { Typography } from "@mui/material";
const items = [
  "# verify account",
  "# update profile",
  "# set preferences",
  "# link accounts",
  "# complete setup",
];
const accordionData = new Array(8).fill({
  title: "How to Complete Identity Verification for a Personal Account?",
  content:
    "You can access the identity verification from [Account] - [Identification], or click [Verify] / [Get verified] from the homepage banners. You can check your current verification level on the page, which determines the trading limit of your account. To increase your limit, please complete the respective identity verification level.",
});

export default function FAQ() {
  return (
    <div className="w-full flex flex-col lg:mb-[145px] md:mb-[132px] mb-[96px] md:px-8 px-4 xl:px-0 xl:mx-auto max-w-[1140px]">
      <div className="bg-form-background rounded-[30px] lg:pb-[64px] lg:pt-[59px] md:pb-[44px] md:pt-[49px] pb-[34px] pt-[39px]  md:px-[66px] px-[16px]  items-center flex flex-col w-full ">
        <Typography
          variant="UH"
          className="text-primary-foreground  text-transparent bg-clip-text bg-gradient-to-r from-[#40A578] to-[#99D9A6] flex"
        >
          Help Center
        </Typography>
        {/*searchs*/}
        <div className="flex w-full justify-between lg:gap-[20px] md:gap-3 gap-2">
          <div className="w-[80%]">
            {" "}
            <Input
              placeholder="Find your desired question..."
              showSearchIcon={true}
            />{" "}
          </div>
          <div className="w-[20%]">
            <Button>Search</Button>
          </div>
        </div>

        {/*Tags*/}

        <div className="grid w-full gap-[19px] mt-[26px] grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {items.map((text, index) => (
            <div
              key={index}
              className="rounded-lg flex items-center border-[1px] border-[#596B89] lg:py-[18px] md:py-0 py-1 lg:px-[20px] md:px-3 px-2 h-[57px]"
            >
              <Typography className="text-[#596B89] text-nowrap" variant="QB">
                {text}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      {/*Accardeons*/}
      <div className="mt-[50px] flex flex-col gap-[26px]">
        {accordionData.map((index) => (
          <AbouUsAccordion key={index} />
        ))}
      </div>
    </div>
  );
}
