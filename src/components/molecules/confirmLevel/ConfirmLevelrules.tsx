import { Button, Typography } from "@mui/material";

export default function ConfirmLevelRules() {
  const exchangeProcessSteps = [
    {
      id: 1,
      text: "Any change in exchange rate on the Binance exchange gives us the right to recalculate the amount of the application.",
    },
    {
      id: 2,
      text: "The rate for your application will be fixed after 1 confirmation online.",
    },
    { id: 3, text: "Funds are credited after 20 transaction confirmations." },
    {
      id: 4,
      text: "We conduct AML checks in accordance with the AML policy of the Flashobmen service.",
    },
    { id: 5, text: "Fill out all fields of the form provided." },
    { id: 6, text: "Click the 'Make an Exchange' button." },
    {
      id: 7,
      text: "Read the terms of exchange. If you accept them, check the appropriate boxes.",
    },
    {
      id: 8,
      text: "Pay for the application according to the instructions on the website.",
    },
  ];

  return (
    <div className="flex flex-col">
      <Typography variant="FT" className="text-white pb-5 pt-10">
        Exchange Conditions:
      </Typography>

      {exchangeProcessSteps.map((step) => (
        <div
          key={step.id}
          className="flex items-start justify-start gap-3 mt-3"
        >
          <Button
            sx={{
              backgroundColor: (theme) => theme.palette.form.buttonBackground,
              color: "white",
              borderRadius: "50%",
              minWidth: "26px",
              minHeight: "26px",
              width: "26px",
              height: "26px",
              padding: 0,
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {step.id}
          </Button>
          <Typography
            variant="FR"
            className="text-white"
            sx={{
              fontSize: {
                xs: "12px",
                sm: "14px",
                md: "16px",
              },
              lineHeight: 1.3,
            }}
          >
            {step.text}
          </Typography>
        </div>
      ))}
    </div>
  );
}
