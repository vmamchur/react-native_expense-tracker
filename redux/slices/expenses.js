import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getExpenses, storeExpense, editExpense, deleteExpense } from "../../util/http";

const fetchExpenses = createAsyncThunk(
  'expenses/fetchAll',
  async () => {
    const expenses = await getExpenses();

    return expenses.reverse();
  }
);

const addExpense = createAsyncThunk(
  'expenses/add',
  async (expenseData) => {
    const expense = await storeExpense(expenseData);

    return expense;
  }
);

const removeExpense = createAsyncThunk(
  'expenses/delete',
  (expenseId) => {
    deleteExpense(expenseId);

    return expenseId;
  }
);

const updateExpense = createAsyncThunk(
  'expenses/update',
  (id, expenseData) => {
    editExpense(id, expenseData);

    return { id, expenseData };
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    values: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.values = action.payload;
    });
    builder.addCase(addExpense.fulfilled, (state, action) => {
      state.values.unshift(action.payload);
    });
    builder.addCase(removeExpense.fulfilled, (state, action) => {
      state.values = state.values.filter((expense) => expense.id !== action.payload);
    });
    builder.addCase(updateExpense.fulfilled, (state, action) => {
      const { id, expenseData } = action.payload;
     
      state.values = state.values.map((expense) => {
        if (expense.id === id) {
          return { ...expense, ...expenseData };
        }

        return expense;
      });
    });
  },
});

export { fetchExpenses, addExpense, removeExpense, updateExpense };
export default expensesSlice.reducer;
