import { configureStore } from "@reduxjs/toolkit";

import expensesReducer from './slices/expenses';

export const store = configureStore({
    reducer: {
      expenses: expensesReducer,
    },
});
