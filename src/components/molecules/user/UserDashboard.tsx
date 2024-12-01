import { Typography } from "@mui/material";
import Input from "@/components/atoms/table/Input";
import StickyHeadTable from "./CustomPaginationActionsTable";
import { useTransactions } from "@/hooks/useTransactions";

//defining a interface for column data
interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: "right" | "left" | "center";
}

export default function UserDashboard() {
  //setting data for header
  const columns: Column[] = [
    { id: "From", label: "From", minWidth: 10, align: "center" },
    { id: "To", label: "To", minWidth: 10, align: "center" },
    { id: "Amount", label: "Amount", minWidth: 10, align: "center" },
    { id: "Received", label: "Received", minWidth: 10, align: "center" },
    { id: "Date", label: "Date", minWidth: 10, align: "center" },
    { id: "Status", label: "Status", minWidth: 10, align: "center" },
    { id: "Link", label: "Link", minWidth: 10, align: "center" },
  ];

  //calling ExchangeHook
  const {
    query, //search variable
    setQuery, //changing search variable
    rows,
    totalPages,
    handlePageChange,
    isLoading,
    status,
    isFetchingNextPage,
  } = useTransactions("exchange");

  return (
    <div className="flex flex-col bg-form-background lg:pt-[20px] lg:pb-[27px] md:py-4 py-3 w-full lg:px-[20px] md:px-4 px-2 rounded-[20px]">
      <Input
        height="57px"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="lg:mt-[41px] lg:mb-[22px] mt-[31px] mb-[12px]">
        <Typography variant="FH" className="text-white">
          Latest Transactions
        </Typography>
      </div>

      {isLoading ? (
        <div className="text-white text-center py-4">Loading...</div>
      ) : status === "error" ? (
        <div className="text-red-500 text-center py-4">Error loading data</div>
      ) : (
        <StickyHeadTable
          columns={columns}
          rows={rows}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isFetchingNextPage}
        />
      )}
    </div>
  );
}
