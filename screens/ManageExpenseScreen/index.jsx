import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {
  IconButton,
  LoadingOverlay,
  ExpenseForm,
  ErrorOverlay,
} from '../../components'
import { GlobalStyles } from '../../constants/styles'
import { useExpenses } from '../../store/expensesProvider'
import {
  storeExpense,
  firebase_updateExpense,
  firebase_deleteExpense,
} from '../../utils/http'

const ManageExpenseScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const { addExpense, deleteExpense, updateExpense, expensesState } =
    useExpenses()

  const editedExpenseId = route.params?.id

  const isEditing = !!editedExpenseId

  const selectedExpense = expensesState?.find(
    expense => expense.id === editedExpenseId
  )

  const deleteExpenseHandler = async () => {
    setIsLoading(true)
    try {
      await firebase_deleteExpense(editedExpenseId)
      deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError('無法刪除該筆資料，請稍後再試')
      setIsLoading(false)
    }
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = async expenseData => {
    setIsLoading(true)
    try {
      if (isEditing) {
        updateExpense(editedExpenseId, expenseData)
        await firebase_updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        addExpense({ ...expenseData, id })
      }
      navigation.goBack()
    } catch (error) {
      setError('無法存取此筆支出，請稍後再試')
      setIsLoading(false)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? '編輯支出' : '新增支出',
    })
  }, [navigation, isEditing])

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />
  }

  if (isLoading) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? '更新' : '新增'}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size="2rem"
            handleOnPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpenseScreen

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
  },
})
