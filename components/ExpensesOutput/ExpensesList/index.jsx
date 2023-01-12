import { StyleSheet, FlatList, Text } from 'react-native'
import React from 'react'
import ExpenseItem from '../ExpenseItem'

const renderItemHandler = itemData => {
  return <ExpenseItem {...itemData.item} />
}

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderItemHandler}
      keyExtractor={item => item.id}
    />
  )
}

export default ExpensesList

const styles = StyleSheet.create({})
