import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { fetchExpenses } from "../redux/slices/expenses";

function RecentExpenses() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.values);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;