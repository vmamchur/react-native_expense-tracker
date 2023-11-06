import axios from 'axios';

const API_URL = 'https://react-native-expense-tra-98950-default-rtdb.europe-west1.firebasedatabase.app/';

export async function storeExpense(expenseData) {
  const response = await axios.post(`${API_URL}/expenses.json`, expenseData);

  const expense = {
    id: response.data.name,
    ...expenseData,
  };

  return expense;
}

export async function getExpenses() {
  const response = await axios.get(`${API_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseData = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseData);
  }

  return expenses;
}

export function deleteExpense(expenseId) {
  return axios.delete(`${API_URL}/expenses/${expenseId}.json`);
}

export function editExpense(expenseId, expenseData) {
  return axios.put(`${API_URL}/expenses/${expenseId}.json`, expenseData);
}