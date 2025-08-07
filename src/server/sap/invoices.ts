import { makeAuthenticatedRequest } from "../serviceLayer";

// Example function to get business partners
export async function getInvoices() {
  // Make GET request to BusinessPartners endpoint
  const data = await makeAuthenticatedRequest({
    method: "GET",
    url: "/Invoices?$select=DocEntry,DocNum,CardCode,CardName,DocDate,DocTotal",
  });

  return data;
}

