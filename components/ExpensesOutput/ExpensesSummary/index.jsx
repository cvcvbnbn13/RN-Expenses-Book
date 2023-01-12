import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../constants/styles'

const ExpensesSummary = ({ periodName, expenses }) => {
  const expensesSummary = expenses?.reduce(
    (sum, expense) => sum + expense.amount,
    0
  )

  return (
    <View style={styles.constainer}>
      <Text style={styles.periodStyle}>{periodName}</Text>
      <Text style={styles.sumStyle}>{expensesSummary}元</Text>
    </View>
  )
}

export default ExpensesSummary

const styles = StyleSheet.create({
  constainer: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodStyle: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sumStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
})
