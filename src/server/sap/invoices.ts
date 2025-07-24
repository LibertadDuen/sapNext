import { makeAuthenticatedRequest } from "../serviceLayer";

interface Invoice {
  CardCode: string;
  DocDate: string;
 DocDueDate: string;
  DocumentLines?: {
    ItemCode: string;
    Quantity: number;
    Price: number;
  }[];
}

// Example function to get business partners
export async function getInvoices() {
  // Make GET request to BusinessPartners endpoint
  const data = await makeAuthenticatedRequest({
    method: "GET",
    url: "/Invoices?$select=DocEntry,DocNum,CardCode,CardName,DocDate,DocTotal",
  });

  return data;
}

export async function createInvoice(invoiceData: Invoice) {
  // Make POST request to Invoices endpoint
  const data = await makeAuthenticatedRequest({
    method: "POST",
    url: "/Invoices",
    data: invoiceData,
  });

  return data;
}