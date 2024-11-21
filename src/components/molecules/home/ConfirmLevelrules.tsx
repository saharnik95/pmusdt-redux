import { Button, Typography } from "@mui/material";
import React from "react";

export default function () {
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
        <div key={step.id} className="flex  gap-3 mt-3">
          <Button
            sx={{
              backgroundColor: "#1D8D94",
              color: "white",
              borderRadius: "100%",
              width: "26px",
              height: "26px",
              fontWeight: 700,
              fontSize: "14px",
              lineClamp: "18.2px",
            }}
          >
            {step.id}
          </Button>
          <Typography variant="FR" className="text-white">
            {step.text}
          </Typography>
        </div>
      ))}
    </div>
  );
}
