import React, { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import {
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

function History() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Load all expenses
  useEffect(() => {
    async function fetchData() {
      const data = await getExpenses();
      setExpenses(data);
    }
    fetchData();
  }, []);

  const handleDeleteExpense = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
      });
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExpense = async (updatedExpense) => {
    const res = await updateExpense(updatedExpense._id, updatedExpense);
    setExpenses(expenses.map((exp) => (exp._id === res._id ? res : exp)));
  };

  // Search + Filter
  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch = exp.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory
      ? exp.category === filterCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1>Expense History</h1>

      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>

      <ExpenseList
        expenses={filteredExpenses}
        onDeleteExpense={handleDeleteExpense}
        onEditExpense={handleEditExpense}
      />
    </div>
  );
}

export default History;
