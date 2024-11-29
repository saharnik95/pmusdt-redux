export type ExchangeTransactionStatus =
  | "Successful"
  | "Checking"
  | "Unsuccessful";
export type PartnerTransactionStatus = "Done" | "Waiting" | "Failed";

export type TransactionStatus =
  | ExchangeTransactionStatus
  | PartnerTransactionStatus;

// Rest of the type definitions remain the same
export interface BaseTransaction {
  id: string;
  amount: number;
  date: string;
  status: TransactionStatus;
}

export interface ExchangeTransaction extends BaseTransaction {
  type: "exchange";
  fromCurrency: string;
  toCurrency: string;
  received: number;
  fromIcon: string;
  toIcon: string;
  status: ExchangeTransactionStatus;
}

export interface PartnerTransaction extends BaseTransaction {
  type: "partner";
  to: string;
  currency: string;
  currencyIcon: string;
  status: PartnerTransactionStatus;
}

// Union type for all transaction types
export type Transaction = ExchangeTransaction | PartnerTransaction;

// API response interfaces
export interface ApiResponse {
  mockData: Transaction[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
