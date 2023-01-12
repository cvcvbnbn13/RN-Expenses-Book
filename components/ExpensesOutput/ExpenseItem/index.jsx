import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../constants/styles'
import { getFormattedDate } from '../../../utils/date'
import { useNavigation } from '@react-navigation/native'

const ExpenseItem = ({ description, date, amount, id }) => {
  const navigation = useNavigation()

  const pressHandler = () => {
    navigation.navigate('ManageExpense', { id: id })
    console.log(1)
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressedStyle}
    >
      <View style={styles.itemStyle}>
        <View>
          <Text style={[styles.textBaseStyle, styles.descStyle]}>
            {description}
          </Text>
          <Text style={styles.textBaseStyle}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountStyle}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
  itemStyle: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBaseStyle: {
    color: GlobalStyles.colors.primary50,
  },
  descStyle: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amountStyle: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
  pressedStyle: {
    opacity: 0.75,
  },
})
