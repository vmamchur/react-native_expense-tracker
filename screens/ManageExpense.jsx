import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { GlobalStyles } from "../constants/styles";
import { addExpense, removeExpense, updateExpense } from "../redux/slices/expenses";

import IconButton from "../components/ui/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const dispatch = useDispatch();
  const selectedExpense = useSelector((state) =>
    state.expenses.values.find((expense) => expense.id === route.params?.expenseId)
  );

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    dispatch(removeExpense(editedExpenseId));
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const submitHandler = (expenseData) => {
    if (isEditing) {
      console.log('😀😀😀', expenseData);
      dispatch(updateExpense(editedExpenseId, expenseData));
    } else {
      dispatch(addExpense(expenseData));
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm 
        onCancel={cancelHandler} 
        onSubmit={submitHandler} 
        submitButtonLabel={isEditing ? 'Save' : 'Add'}
        defaultValues={selectedExpense}
      />

      {isEditing &&
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      }
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  }
});