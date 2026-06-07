const API_URL =
  "https://expense-backend-production-c7f0.up.railway.app/api/expenses";

export async function getExpenses() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addExpense(expense) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return res.json();
}

export async function updateExpense(id, expense) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return res.json();
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}
