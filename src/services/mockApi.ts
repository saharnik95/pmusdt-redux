import axios from "axios";
import type { ApiResponse, Transaction } from "./transactiontype";

const API_BASE_URL = "http://localhost:5000";

// Helper function to filter transactions based on search query and type
const filterTransactions = (
  transactions: Transaction[],
  search: string,
  type?: "exchange" | "partner"
): Transaction[] => {
  const searchLower = search.toLowerCase();
  return transactions.filter((transaction) => {
    // Filter based on type if provided
    if (type && transaction.type !== type) {
      return false;
    }
    // Filter for "exchange" type transactions
    if (transaction.type === "exchange") {
      return (
        transaction.fromCurrency.toLowerCase().includes(searchLower) ||
        transaction.toCurrency.toLowerCase().includes(searchLower) ||
        transaction.amount.toString().includes(searchLower) ||
        transaction.received.toString().includes(searchLower) ||
        transaction.status.toLowerCase().includes(searchLower)
      );
    } else {
      // Filter for "partner" type transactions
      return (
        transaction.to.toLowerCase().includes(searchLower) ||
        transaction.amount.toString().includes(searchLower) ||
        transaction.currency.toLowerCase().includes(searchLower) ||
        transaction.status.toLowerCase().includes(searchLower)
      );
    }
  });
};

//fetch from api
export const fetchTransactions = async (
  type: "exchange" | "partner" | "all",
  search: string = "",
  page: number = 1
): Promise<ApiResponse> => {
  try {
    console.log(
      `Fetching transactions: type=${type}, search=${search}, page=${page}`
    );

    const response = await axios.get<{
      mockData: Transaction[];
      meta: Record<string, any>;
    }>(`${API_BASE_URL}/transactions`, {
      params: {
        type: type === "all" ? undefined : type,
        search,
        page,
        limit: 7,
      },
    });

    console.log("Raw API Response:", response);
    console.log("API Response Data:", response.data);

    if (!response.data) {
      throw new Error("No data received from the server.");
    }

    const { mockData } = response.data; // destructure mockdata and meta
    console.log("mockData:", mockData);

    if (!Array.isArray(mockData)) {
      console.error("Unexpected response structure:", response.data);
      throw new Error("Invalid response format: 'mockData' is not an array.");
    }

    // Apply filtering based on the search term
    let filteredData = filterTransactions(
      mockData,
      search,
      type === "all" ? undefined : type
    );

    // Pagination logic
    const startIndex = (page - 1) * 7;
    const endIndex = startIndex + 7;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      mockData: paginatedData,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(filteredData.length / 7),
        totalItems: filteredData.length,
        itemsPerPage: 7,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(`Network error: ${error.message}`);
    }
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
