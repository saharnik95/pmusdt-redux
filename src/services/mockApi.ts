import transactionsData from "@/mocks/transaction.json";
import type { ApiResponse, Transaction } from "./transactiontype";

// Helper function to filter transactions based on search query and type returnes an array of results
const filterTransactions = (
  transactions: Transaction[],
  search: string,
  type?: "exchange" | "partner"
) => {
  const searchLower = search.toLowerCase();
  return transactions.filter((transaction) => {
    if (type && transaction.type !== type) {
      return false;
    }
    if (transaction.type === "exchange") {
      return (
        transaction.fromCurrency.toLowerCase().includes(searchLower) ||
        transaction.toCurrency.toLowerCase().includes(searchLower) ||
        transaction.amount.toString().includes(searchLower) ||
        transaction.received.toString().includes(searchLower) ||
        transaction.status.toLowerCase().includes(searchLower)
      );
    } else {
      return (
        transaction.to.toLowerCase().includes(searchLower) ||
        transaction.amount.toString().includes(searchLower) ||
        transaction.currency.toLowerCase().includes(searchLower) ||
        transaction.status.toLowerCase().includes(searchLower)
      );
    }
  });
};

// Fetch transactions
export const fetchTransactions = async (
  type: "exchange" | "partner" | "all",
  search: string = "",
  page: number = 1
): Promise<ApiResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); //simulate api delay

  const data = transactionsData.transactions; //fetch from json file
  let filteredData = filterTransactions(
    //search
    data.mockData as Transaction[],
    search,
    type === "all" ? undefined : type
  );
  const startIndex = (page - 1) * 7;
  const endIndex = startIndex + 7;
  const paginatedData = filteredData.slice(startIndex, endIndex); //in every page shows 7 transactions

  return {
    mockData: paginatedData,
    meta: {
      currentPage: page,
      totalPages: Math.ceil(filteredData.length / 7), //totalpage and item base on filtered data
      totalItems: filteredData.length,
      itemsPerPage: 7,
    },
  };
};
