import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useNavigate } from "react-router-dom";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  // Load expenses from backend
  useEffect(() => {
    async function fetchData() {
      const data = await getExpenses();
      setExpenses(data);
    }
    fetchData();
  }, []);

  const handleAddExpense = async (expense) => {
    const newExpense = await addExpense(expense);
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter((exp) => exp._id !== id));
  };

  const handleEditExpense = async (updatedExpense) => {
    const res = await updateExpense(updatedExpense._id, updatedExpense);
    setExpenses(expenses.map((exp) => (exp._id === res._id ? res : exp)));
  };

  // Summary calculations
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const currentMonth = new Date().getMonth();
  const monthlyExpenses = expenses
    .filter((exp) => new Date(exp.date).getMonth() === currentMonth)
    .reduce((sum, exp) => sum + exp.amount, 0);
  const recentTransactions = expenses.slice(0, 5);

  return (
    <div>
      <h1>Expense Tracker Dashboard</h1>
      <ExpenseForm onAddExpense={handleAddExpense} />

      <div className="card">
        <h2>Summary</h2>
        <div className="summary">
          <div className="summary-item">
            <strong>Total Expenses</strong>
            <p>₹{totalExpenses}</p>
          </div>
          <div className="summary-item">
            <strong>Monthly Expenses</strong>
            <p>₹{monthlyExpenses}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Recent Transactions</h2>
        <ExpenseList
          expenses={recentTransactions}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
        />
        <button className="primary" onClick={() => navigate("/history")}>
          View Full History
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
