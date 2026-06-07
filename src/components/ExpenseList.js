import React, { useState } from "react";

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  const [editing_id, setEditing_id] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const startEdit = (expense) => {
    setEditing_id(expense._id);
    setEditData({ ...expense });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const saveEdit = () => {
    onEditExpense(editData);
    setEditing_id(null);
  };

  return (
    <ul>
      {expenses.map((exp) => (
        <li key={exp._id}>
          {editing_id === exp._id ? (
            <>
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
              />
              <input
                type="number"
                name="amount"
                value={editData.amount}
                onChange={handleEditChange}
              />
              <select
                name="category"
                value={editData.category}
                onChange={handleEditChange}
              >
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                name="date"
                value={editData.date}
                onChange={handleEditChange}
              />
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditing_id(null)}>Cancel</button>
            </>
          ) : (
            <>
              {exp.title} - ₹{exp.amount} ({exp.category}) on {exp.date}
              <button onClick={() => startEdit(exp)}>Edit</button>
              <button onClick={() => onDeleteExpense(exp._id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
