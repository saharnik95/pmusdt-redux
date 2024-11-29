import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/services/mockApi";
import type { Transaction } from "@/services/transactiontype";
import TableStatus from "@/components/atoms/table/TableStatus";

export const useExchangeTransactions = () => {
  const [query, setQuery] = useState<string>(""); //search variable

  const { data, fetchNextPage, isFetchingNextPage, isLoading, status } =
    useInfiniteQuery({
      queryKey: ["exchangeTransactions", query], //sending query to api to search -tell react query to checks which data in catch
      queryFn: (
        { pageParam = 1 } //if data doesnt exist incatch use this function to relocate them
      ) => fetchTransactions("exchange", query, pageParam), //calling api
      getNextPageParam: (
        lastPage //provides next page to fetch
      ) =>
        lastPage.meta.currentPage < lastPage.meta.totalPages //until there is a next page returns that till it ends
          ? lastPage.meta.currentPage + 1
          : undefined,
      initialPageParam: 1,
    });

  //changing data into proper data for table
  const transformData = (transaction: Transaction) => {
    if (transaction.type !== "exchange") return null; //return only exchange type data
    //colors for status
    const statusStyles = {
      Successful: { textColor: "#035610", bgColor: "#40A578" },
      Checking: { textColor: "#603E0F", bgColor: "#F3AC76" },
      Unsuccessful: { textColor: "#60140F", bgColor: "#F66066" },
    };

    return {
      From: (
        <span className="flex flex-row items-center gap-2">
          <img
            src={transaction.fromIcon}
            alt=""
            className="w-6 h-6 rounded-full lg:flex hidden"
          />
          {transaction.fromCurrency}
        </span>
      ),
      To: (
        <span className="flex flex-row items-center gap-2">
          <img
            src={transaction.toIcon}
            alt=""
            className="w-6 h-6 rounded-full lg:flex hidden"
          />
          {transaction.toCurrency}
        </span>
      ),
      Amount: transaction.amount,
      Received: transaction.received,
      Date: new Date(transaction.date).toLocaleDateString(),
      Status: (
        <TableStatus
          textColor={statusStyles[transaction.status].textColor}
          bgColor={statusStyles[transaction.status].bgColor}
          text={transaction.status}
        />
      ),
      Link: <a href="#">See More</a>,
    };
  };

  const rows =
    data?.pages.flatMap(
      (
        page //turns all data  from pages into a flat 1dimension array
      ) =>
        page.mockData

          .filter(
            //filter transaction with exchange type
            (
              transaction
            ): transaction is Extract<Transaction, { type: "exchange" }> =>
              transaction.type === "exchange"
          )
          .map(transformData) //map those data in transform data to change it into table data
          .filter((row): row is NonNullable<typeof row> => row !== null) //filters any row that has null
    ) || [];

  //reads from api
  const totalPages = data?.pages[0]?.meta.totalPages || 1;

  //checks if the data for new page has been fetched or not,if not renders fetchnextpage to fetch them
  const handlePageChange = async (newPage: number) => {
    if (newPage + 1 > (data?.pages.length || 0)) {
      //the pages has been fetched until now
      await fetchNextPage();
    }
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
