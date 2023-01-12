import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FormInput from './FormInput'
import NormalButton from '../NormalButton'
import { getFormattedDate } from '../../../utils/date'
import { GlobalStyles } from '../../../constants/styles'

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  })

  const handleInput = (name, enteredValue) => {
    setExpenseInfo(currentInfo => {
      return {
        ...currentInfo,
        [name]: { value: enteredValue, isValid: true },
      }
    })
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +expenseInfo.amount.value,
      date: new Date(expenseInfo.date.value),
      description: expenseInfo.description.value,
    }

    const amountIsVaild = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsVaild = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsVaild = expenseData.description.trim().length > 0

    if (!amountIsVaild || !dateIsVaild || !descriptionIsVaild) {
      setExpenseInfo(curInfo => {
        return {
          amount: { value: curInfo.amount.value, isValid: amountIsVaild },
          date: { value: curInfo.date.value, isValid: dateIsVaild },
          description: {
            value: curInfo.description.value,
            isValid: descriptionIsVaild,
          },
        }
      })
      return
    }

    onSubmit(expenseData)
  }

  const formIsInvalid =
    !expenseInfo.amount.isValid ||
    !expenseInfo.date.isValid ||
    !expenseInfo.description.isValid

  return (
    <View style={styles.formStyle}>
      <Text style={styles.titleStyle}>你的支出</Text>
      <View style={styles.inputsRow}>
        <FormInput
          label="支出金額"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: handleInput.bind(this, 'amount'),
            value: expenseInfo.amount.value,
          }}
          styleProps={styles.rowInputStyle}
          inValid={!expenseInfo.amount.isValid}
        />
        <FormInput
          label="日期"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: handleInput.bind(this, 'date'),
            value: expenseInfo.date.value,
          }}
          styleProps={styles.rowInputStyle}
          inValid={!expenseInfo.date.isValid}
        />
      </View>
      <FormInput
        label="摘要"
        textInputConfig={{
          multline: true,
          onChangeText: handleInput.bind(this, 'description'),
          value: expenseInfo.description.value,
        }}
        inValid={!expenseInfo.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorTextStyle}>
          錯誤!! 請確認欄位資料是否有誤或是空白
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <NormalButton
          mode="flat"
          handleOnPress={onCancel}
          propsStyle={styles.buttonStyle}
        >
          取消
        </NormalButton>
        <NormalButton
          handleOnPress={submitHandler}
          propsStyle={styles.buttonStyle}
        >
          {submitButtonLabel}
        </NormalButton>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  rowInputStyle: {
    flex: 1,
  },
  formStyle: {
    marginTop: 80,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorTextStyle: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
})
