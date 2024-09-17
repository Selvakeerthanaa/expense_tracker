import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [balance, setBalance] = useState(0); 
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setTotalExpense((prevTotal) => prevTotal + newExpense.amount);
    setBalance((prevBalance) => prevBalance - newExpense.amount);
  };

  const handleDeleteExpense = (id, amount) => {
    setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
    setTotalExpense((prevTotal) => prevTotal - amount);
    setBalance((prevBalance) => prevBalance + amount);
  };

  const handleSetBalance = (e) => {
    e.preventDefault();
    const newBalance = parseFloat(e.target.balance.value);
    if (!isNaN(newBalance) && newBalance >= 0) {
      setBalance(newBalance);
    }
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      
      
      <form onSubmit={handleSetBalance} className="balance-form">
        <input
          type="number"
          placeholder="Enter Total Money in Account"
          name="balance"
          required
        />
        <button type="submit">Set Balance</button>
      </form>

      
      <ExpenseForm onAddExpense={handleAddExpense} />

    
      <table>
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => handleDeleteExpense(expense.id, expense.amount)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"><strong>Total Expense:</strong></td>
            <td>${totalExpense.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="2"><strong>Money Left:</strong></td>
            <td>${balance.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// Expense Form Component
function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && amount) {
      const newExpense = {
        title,
        amount: parseFloat(amount),
        id: Date.now(),
      };
      onAddExpense(newExpense);
      setTitle('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Expense Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default App;
