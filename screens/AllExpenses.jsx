import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchExpenses } from "../redux/slices/expenses";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function AllExpenses() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.values);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;