import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/services/mockApi";
import type { Transaction } from "@/services/transactiontype";
import TableStatus from "@/components/atoms/table/TableStatus";

export const usePartnerTransactions = () => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading, status } =
    useInfiniteQuery({
      queryKey: ["partnerTransactions"], // tell react query to checks which data in catch
      queryFn: (
        { pageParam = 1 } //if data doesnt exist incatch use this function to relocate them
      ) => fetchTransactions("partner", "", pageParam), //calling api
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
    if (transaction.type !== "partner") return null; //return only partner type data
    //colors for status

    const statusStyles = {
      Done: { textColor: "#035610", bgColor: "#40A578" },
      Waiting: { textColor: "#603E0F", bgColor: "#F3AC76" },
      Failed: { textColor: "#60140F", bgColor: "#F66066" },
    };

    return {
      Amount: (
        <span className="flex flex-row items-center gap-2">
          <img
            src={transaction.currencyIcon}
            alt=""
            className="w-6 h-6 rounded-full md:flex hidden"
          />
          {`${transaction.amount} `}
        </span>
      ),
      To: (
        <span className="text-white">
          <span className="hidden lg:block">{transaction.to}</span>
          <span className="block lg:hidden">
            {transaction.to.slice(0, 10)}...
          </span>
        </span>
      ),
      Date: new Date(transaction.date).toLocaleDateString(),
      Status: (
        <TableStatus
          textColor={statusStyles[transaction.status].textColor}
          bgColor={statusStyles[transaction.status].bgColor}
          text={transaction.status}
        />
      ),
    };
  };

  const rows =
    data?.pages.flatMap((page) =>
      page.mockData
        .filter(
          (
            transaction
          ): transaction is Extract<Transaction, { type: "partner" }> =>
            transaction.type === "partner"
        )
        .map(transformData)
        .filter((row): row is NonNullable<typeof row> => row !== null)
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
    rows,
    totalPages,
    handlePageChange,
    isLoading, //comes from react query
    status, //comes from react query
    isFetchingNextPage, //comes from react query
  };
};
