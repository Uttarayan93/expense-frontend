import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import "./styles/App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const deleteExpense = (_id) => {
    setExpenses(expenses.filter((exp) => exp._id !== _id));
  };

  const editExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((exp) =>
        exp._id === updatedExpense._id ? updatedExpense : exp,
      ),
    );
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Dashboard expenses={expenses} setExpenses={setExpenses} />}
        />
        <Route
          path="/history"
          element={
            <History
              expenses={expenses}
              onDeleteExpense={deleteExpense}
              onEditExpense={editExpense}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
