import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() || '',
      isValid: true,
    },
    date: {
      value: getFormattedDate(defaultValues?.date) || '',
      isValid: true,
    },
    description: {
      value: defaultValues?.description || '',
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((currInputs) => ({
      ...currInputs,
      [inputIdentifier]: {
        value: enteredValue,
        isValid: true,
      },
    }));
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currInputs) => ({
        amount: {
          value: currInputs.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: currInputs.date.value,
          isValid: dateIsValid,
        },
        description: {
          value: currInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  const isFormValid = inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <CustomInput
          style={styles.rowInput}
          label="Amount"
          isValid={inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => inputChangeHandler('amount', value),
            value: inputs.amount.value,
          }}
        />

        <CustomInput
          style={styles.rowInput}
          label="Date"
          isValid={inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => inputChangeHandler('date', value),
            value: inputs.date.value,
          }}
        />
      </View>
      <CustomInput
        label="Description"
        isValid={inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => inputChangeHandler('description', value),
          value: inputs.description.value,
        }}
      />

      {!isFormValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}

      <View style={styles.buttonsContainer}>
        <CustomButton onPress={onCancel} mode="flat" style={styles.button}>
          Cancel
        </CustomButton>

        <CustomButton onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </CustomButton>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    flex: 1,
  },
});