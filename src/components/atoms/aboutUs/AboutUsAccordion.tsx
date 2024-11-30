import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import DownFlashIconComponent from "@/components/icons/DownFlashIconComponent";
import RightFlashIconComponent from "@/components/icons/RightFlashIconComponent";

export default function AboutUsAccordion() {
  return (
    <div>
      <Accordion
        sx={{
          width: "100%",
          bgcolor: "transparent",
          borderRadius: "30px",
          borderWidth: "1px",
          borderColor: "#2E3E59",
          "&:first-of-type": {
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
          },
          "&:last-of-type": {
            borderBottomLeftRadius: "30px",
            borderBottomRightRadius: "30px",
          },
        }}
      >
        <AccordionSummary
          sx={{
            bgcolor: "transparent",
          }}
          expandIcon={<DownFlashIconComponent color="white" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span className="flex items-center mr-2 ml-3">
            {" "}
            <RightFlashIconComponent />
          </span>

          <Typography variant="FH" className="text-white lg:py-[26px]">
            How to Complete Identity Verification for a Personal Account?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="FI" className="text-footer-text ">
            You can access the identity verification from [Account] -
            [Identification], or click [Verify] / [Get verified] from the
            homepage banners. You can check your current verification level on
            the page, which determines the trading limit of your account. To
            increase your limit, please complete the respective identity
            verification level.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
