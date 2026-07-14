import { apiFetch } from "./fetcher";

export function getAllAuctions() {
  return apiFetch("/auctions");
}

import { login } from "./auth";

async function testLogin() {
  try {
    const data = await login("testuser", "1234");
    console.log("✅ Login success:", data);
  } catch (err) {
    console.error("❌ Login failed:", err.message);
  }
}

testLogin();


export function createAuction(auction) {
  return apiFetch("/auctions", { method: "POST", body: JSON.stringify(auction) });
}
