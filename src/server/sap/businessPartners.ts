import { makeAuthenticatedRequest } from "../serviceLayer";

// Example function to get business partners
export async function getBusinessPartners() {
  // Make GET request to BusinessPartners endpoint
  const data = await makeAuthenticatedRequest({
    method: "GET",
    url: "/BusinessPartners?$select=CardCode,CardName,CardType",
  });

  return data;
}