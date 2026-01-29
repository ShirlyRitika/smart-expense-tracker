// Get expenses
export const getExpenses = (email) => {
  const data = localStorage.getItem(`expenses_${email}`);
  return data ? JSON.parse(data) : [];
};

// Save expenses
export const saveExpenses = (email, expenses) => {
  localStorage.setItem(
    `expenses_${email}`,
    JSON.stringify(expenses)
  );
};

// Add expense
export const addExpense = (email, expense) => {
  const expenses = getExpenses(email);

  expenses.push({
    ...expense,
    id: Date.now(),
  });

  saveExpenses(email, expenses);
};

// Delete expense
export const deleteExpense = (email, id) => {
  let expenses = getExpenses(email);

  expenses = expenses.filter((e) => e.id !== id);

  saveExpenses(email, expenses);
};
