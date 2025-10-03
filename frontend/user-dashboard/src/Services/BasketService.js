
const API_URL='https://localhost:7031/api/Basket';
export async function fetchBasket(token) {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch basket");
  return res.json();
}

export async function UpdateToBasket(token,basket) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(basket),
  });
  if (!res.ok) throw new Error("Failed to add to basket");
  return res.json();
}

export async function ResetBasket(token) {
  const res = await fetch(API_URL, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to remove from basket");
  return res.json();
}