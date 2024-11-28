import { useState } from "react";
import StickyHeadTable from "./CustomPaginationActionsTable";
import TableStatus from "@/components/atoms/table/TableStatus";
import { Typography } from "@mui/material";
import Input from "@/components/atoms/table/Input";

export default function UserDashboard() {
  interface Column {
    id: string;
    label: string;
    minWidth: number;
    align?: "right" | "left" | "center";
    format?: (value: any) => string | JSX.Element;
  }

  const columns: Column[] = [
    { id: "From", label: "From", minWidth: 10, align: "center" },
    { id: "To", label: "To", minWidth: 10, align: "center" },
    { id: "Amount", label: "Amount", minWidth: 10, align: "center" },
    { id: "Received", label: "Received", minWidth: 10, align: "center" },
    { id: "Date", label: "Date", minWidth: 10, align: "center" },
    { id: "Status", label: "Status", minWidth: 10, align: "center" },
    { id: "Link", label: "Link", minWidth: 10, align: "center" },
  ];

  const allRows = Array.from({ length: 28 }, (_, i) => {
    const statusText =
      i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Failed";
    const statusStyles = {
      Completed: { textColor: "#035610", bgColor: "#40A578" },
      Pending: { textColor: "#603E0F", bgColor: "#F3AC76" },
      Failed: { textColor: "#60140F", bgColor: "#F66066" },
    };

    return {
      From: (
        <span className="flex flex-row items-center gap-2">
          <img
            src="./images/tether.png"
            alt=""
            className="w-6 h-6 rounded-full lg:flex hidden"
          />
          USDT
        </span>
      ),
      To: (
        <span className="flex flex-row items-center gap-2">
          <img
            src="./images/perfectMoney.png"
            alt=""
            className="w-6 h-6 rounded-full lg:flex hidden"
          />
          PM
        </span>
      ),
      Amount: 1000,
      Received: 1200 + i,
      Date: `25-02-2023`,
      Status: (
        <TableStatus
          textColor={statusStyles[statusText].textColor}
          bgColor={statusStyles[statusText].bgColor}
          text={statusText}
        />
      ),
      Link: <a href="#">See More</a>,
    };
  });

  // State for search query
  const [query, setQuery] = useState("");

  // Filter rows based on the query
  const filteredRows = allRows.filter((row) =>
    Object.values(row).some((value) => {
      // Convert JSX to string if necessary
      let text = "";

      if (typeof value === "string") {
        text = value;
      } else if (typeof value === "number") {
        text = value.toString(); // Convert number to string
      } else if (typeof value === "object" && value.props?.children) {
        text = value.props.children.toString(); // Extract children text from JSX
      }

      return text.toLowerCase().includes(query.toLowerCase());
    })
  );

  return (
    <div className="flex flex-col bg-form-background lg:pt-[20px] lg:pb-[27px] md:py-4 py-3 w-full lg:px-[20px] md:px-4 px-2 rounded-[20px]">
      {/* Search Input */}
      <Input
        placeholder="Search..."
        value={query} // Controlled value
        onChange={(e) => setQuery(e.target.value)} // Update query
      />
      <div className="lg:mt-[41px] lg:mb-[22px]   mt-[31px] mb-[12px]">
        <Typography variant="FH" className="text-white">
          Latest Transactions
        </Typography>
      </div>

      {/* Table with filtered rows */}
      <StickyHeadTable columns={columns} rows={filteredRows} />
    </div>
  );
}
