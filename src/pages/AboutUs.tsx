import { Divider, Typography } from "@mui/material";
import AboutUsDiv from "@/components/atoms/aboutUs/AboutUsDiv";

export default function AboutUs() {
  return (
    <div className="w-full flex flex-col lg:mb-[145px]  md:px-8 md:py-16 px-4 py-12 max-w-[1140px] xl:px-0 xl:mx-auto">
      {/*Top Part*/}
      <div className="bg-form-background rounded-[30px] flex lg:pb-[81px] lg:pl-[55px] lg:pt-[33px] md:pb-[71px] md:pl-[45px] md:pt-[23px] pb-[51px] pl-[15px] pt-[13px] relative">
        <div className="flex flex-col xl:basis-[498px] lg:basis-[398px] md:basis-[310px] sm:basis-[310px] basis-[210px]">
          <Typography
            variant="UH"
            className="text-primary-foreground  text-transparent bg-clip-text bg-gradient-to-r from-[#40A578] to-[#99D9A6] flex"
          >
            {" "}
            We Are Here To Make Your Transaction Much Easier
          </Typography>
          <Typography className="text-footer-text text-justify" variant="PH">
            At pmusdt.com, we believe that everyone should have the freedom to
            earn, hold, spend, share and give their money - no matter who you
            are or where you come from.{" "}
          </Typography>
        </div>

        <div className="rounded-full bg-[#242C39] xl:max-w-[535px] xl:max-h-[535px] lg:max-w-[435px] lg:max-h-[435px] md:max-w-[310px]  md:max-h-[310px] sm:max-w-[200px] sm:max-h-[200px] max-w-[135px] max-h-[135px] z-100 absolute right-6 xs:right-1 top-16 md:top-4 flex justify-center items-center">
          <img src="./images/puzzle.png" alt="" className="object-contain" />
        </div>
      </div>

      {/*Bottom Part*/}
      <div className="flex flex-col lg:mt-[96px] md:mt-[76px] mt-[56px] mx-auto">
        <AboutUsDiv
          title="Our Mission"
          description="Today, pmusdt.com is the world’s leading blockchain ecosystem, with a product suite that includes the largest digital asset exchange. Our mission is to be the infrastructure provider for crypto in tomorrow’s world."
        />
        <Divider
          orientation="vertical"
          sx={{
            height: "55px",
            width: "1px",
            backgroundColor: "#2E3E59",
            marginX: "auto",
          }}
        />
        <AboutUsDiv
          title="Our Vision"
          description="Our vision is to increase the freedom of money globally. We believe that
        by spreading this freedom, we can significantly improve lives around the
        world."
        />
        <Divider
          orientation="vertical"
          sx={{
            height: "55px",
            width: "1px",
            backgroundColor: "#2E3E59",
            marginX: "auto",
          }}
        />
        <AboutUsDiv
          title="Our Values"
          description="pmusdt.com Core Values guide our behavior, decisions, and action, enabling unified collaboration across our diverse, international teams."
        />
      </div>
    </div>
  );
}
