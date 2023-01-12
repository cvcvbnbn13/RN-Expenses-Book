import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useExpenses } from '../../store/expensesProvider'
import { ExpensesOutput } from '../../components'

const AllExpenseScreen = () => {
  const { expensesState } = useExpenses()

  return (
    <ExpensesOutput
      expenses={expensesState}
      expensesPeriod="總計"
      fallbackText="無任何支出"
    />
  )
}

export default AllExpenseScreen

const styles = StyleSheet.create({})
