import { makeAuthenticatedRequest } from "../serviceLayer";

interface Item { 
    ItemCode: string;
    ItemName: string;
    ItemType: string;
}

export async function createItem(itemsData: Item) {
  const data = await makeAuthenticatedRequest({
    method: "POST",
    url: "/Items",
    data: itemsData,
  });

  return data;
}

export async function getItems() {
  const data = await makeAuthenticatedRequest({
    method: "GET",
    url: "/Items",
  });

  return data;
}