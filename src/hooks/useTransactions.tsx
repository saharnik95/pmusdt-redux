import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/services/mockApi";
import type {
  Transaction,
  ExchangeTransaction,
  PartnerTransaction,
} from "@/services/transactiontype";
import TableStatus from "@/components/atoms/table/TableStatus";

type TransactionType = "exchange" | "partner";

//defining interface for status style
interface StatusStyle {
  textColor: string;
  bgColor: string;
}

//defining type of statusstyles
type StatusStyles = {
  [key: string]: StatusStyle;
};

export const useTransactions = (transactionType: TransactionType) => {
  const [query, setQuery] = useState<string>(""); //search variable (only used for exchange transactions)

  const { data, fetchNextPage, isFetchingNextPage, isLoading, status } =
    useInfiniteQuery({
      queryKey: [
        `${transactionType}Transactions`,
        ...(transactionType === "exchange" ? [query] : []),
      ], //sending query to api to search tell react query to checks which data in catch
      queryFn: ({ pageParam = 1 }) =>
        fetchTransactions(
          transactionType,
          transactionType === "exchange" ? query : "",
          pageParam
        ), //calling api
      getNextPageParam: (lastPage) =>
        lastPage.meta.currentPage < lastPage.meta.totalPages //until there is a next page returns that till it ends
          ? lastPage.meta.currentPage + 1
          : undefined,
      initialPageParam: 1,
    });

  //changing data into proper data for table
  const transformData = (transaction: Transaction) => {
    if (transaction.type !== transactionType) return null; //return only specified type data
    //colors for status
    const statusStyles: StatusStyles =
      transactionType === "exchange"
        ? {
            Successful: { textColor: "#035610", bgColor: "#40A578" },
            Checking: { textColor: "#603E0F", bgColor: "#F3AC76" },
            Unsuccessful: { textColor: "#60140F", bgColor: "#F66066" },
          }
        : {
            Done: { textColor: "#035610", bgColor: "#40A578" },
            Waiting: { textColor: "#603E0F", bgColor: "#F3AC76" },
            Failed: { textColor: "#60140F", bgColor: "#F66066" },
          };

    if (transactionType === "exchange") {
      const exchangeTransaction = transaction as ExchangeTransaction;
      return {
        From: (
          <span className="flex flex-row items-center gap-2">
            <img
              src={exchangeTransaction.fromIcon}
              alt=""
              className="w-6 h-6 rounded-full lg:flex hidden"
            />
            {exchangeTransaction.fromCurrency}
          </span>
        ),
        To: (
          <span className="flex flex-row items-center gap-2">
            <img
              src={exchangeTransaction.toIcon}
              alt=""
              className="w-6 h-6 rounded-full lg:flex hidden"
            />
            {exchangeTransaction.toCurrency}
          </span>
        ),
        Amount: exchangeTransaction.amount,
        Received: exchangeTransaction.received,
        Date: new Date(exchangeTransaction.date)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-"),
        Status: (
          <TableStatus
            textColor={statusStyles[exchangeTransaction.status].textColor}
            bgColor={statusStyles[exchangeTransaction.status].bgColor}
            text={exchangeTransaction.status}
          />
        ),
        Link: <a href="#">See More</a>,
      };
    } else {
      // Partner transaction
      const partnerTransaction = transaction as PartnerTransaction;
      return {
        Amount: (
          <span className="flex flex-row items-center gap-2">
            <img
              src={partnerTransaction.currencyIcon}
              alt=""
              className="w-6 h-6 rounded-full md:flex hidden"
            />
            {`${partnerTransaction.amount} `}
          </span>
        ),
        To: (
          <span className="text-white">
            <span className="hidden lg:block">{partnerTransaction.to}</span>
            <span className="block lg:hidden">
              {partnerTransaction.to.slice(0, 10)}...
            </span>
          </span>
        ),
        Date: new Date(partnerTransaction.date)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-"),
        Status: (
          <TableStatus
            textColor={statusStyles[partnerTransaction.status].textColor}
            bgColor={statusStyles[partnerTransaction.status].bgColor}
            text={partnerTransaction.status}
          />
        ),
      };
    }
  };

  //console.log("data pages");
  //console.log(data?.pages);

  const rows =
    data?.pages.flatMap(
      (
        page //turning it into a one dimension array
      ) =>
        page.mockData
          .filter(
            //filter by type
            (transaction): transaction is Transaction =>
              transaction.type === transactionType
          )
          .map(transformData) //turn into transform data by mapping
          .filter((row): row is NonNullable<typeof row> => row !== null)
    ) || [];
  console.log("rows");
  console.log(rows);

  //reads from api
  const totalPages = data?.pages[0]?.meta.totalPages || 1;

  //checks if the data for new page has been fetched or not,if not renders fetchnextpage to fetch them
  const handlePageChange = async (newPage: number) => {
    if (newPage + 1 > (data?.pages.length || 0)) {
      //the pages has been fetched until now
      await fetchNextPage();
      //console.log("fetching next page");
    }
    //console.log("data pages length" + data?.pages.length);
  };

  return {
    query,
    setQuery,
    rows,
    totalPages,
    handlePageChange,
    isLoading, //comes from react query
    status, //comes from react query
    isFetchingNextPage, //comes from react query
  };
};
