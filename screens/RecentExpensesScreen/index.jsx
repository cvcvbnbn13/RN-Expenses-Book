import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useExpenses } from '../../store/expensesProvider'
import { ExpensesOutput, LoadingOverlay, ErrorOverlay } from '../../components'
import { getDateMinusDay } from '../../utils/date'
import { fetchExpense } from '../../utils/http'

const RecentExpensesScreen = () => {
  const [isFetching, setIsFetching] = useState(true)

  const [error, setError] = useState('')

  const { expensesState, setExpenses } = useExpenses()

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)
      try {
        const expenses = await fetchExpense()
        setExpenses(expenses)
      } catch (err) {
        setError('無法加載資料')
      }
      setIsFetching(false)
    }

    getExpenses()
  }, [])

  const recentExpensesState = expensesState?.filter(expense => {
    const today = new Date()
    const sevenDaysAgo = getDateMinusDay(today, 7)

    return expense.date > sevenDaysAgo && expense.date <= today
  })

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput
      expenses={recentExpensesState}
      expensesPeriod="最近七天"
      fallbackText="七天內無任何支出
    "
    />
  )
}

export default RecentExpensesScreen

const styles = StyleSheet.create({})
