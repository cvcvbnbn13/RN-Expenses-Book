import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: '午餐',
    amount: 120,
    date: new Date('2023-01-10'),
  },
  {
    id: 'e2',
    description: '生活雜物',
    amount: 450,
    date: new Date('2023-01-05'),
  },
  {
    id: 'e3',
    description: '午餐',
    amount: 100,
    date: new Date('2023-01-09'),
  },
  {
    id: 'e4',
    description: '宵夜',
    amount: 150,
    date: new Date('2023-01-09'),
  },
  {
    id: 'e5',
    description: '花蓮火車票',
    amount: 880,
    date: new Date('2022-12-25'),
  },
]

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content = <Text style={styles.infoTextStyle}>{fallbackText}</Text>

  if (expenses?.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoTextStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
})
