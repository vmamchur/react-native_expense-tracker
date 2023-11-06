import { FlatList } from "react-native";

import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => (
        <ExpenseItem
          id={item.id}
          description={item.description}
          amount={item.amount}
          date={item.date}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;