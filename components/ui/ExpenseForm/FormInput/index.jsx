import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../../constants/styles'

const FormInput = ({ label, styleProps, textInputConfig, inValid }) => {
  const inputStyles = [styles.inputStyle]

  if (textInputConfig && textInputConfig.multline) {
    inputStyles.push(styles.inputMultlineStyle)
  }

  if (inValid) {
    inputStyles.push(styles.inValidInputStyle)
  }

  return (
    <View style={[styles.inputContainer, styleProps]}>
      <Text style={[styles.labelStyle, inValid && styles.inValidLabelStyle]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  labelStyle: {
    fontSize: 12,
    color: GlobalStyles.colors.primary500,
    marginBottom: 4,
  },
  inputStyle: {
    backgroundColor: 'white',
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultlineStyle: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inValidLabelStyle: {
    color: GlobalStyles.colors.error500,
  },
  inValidInputStyle: {
    backgroundColor: GlobalStyles.colors.error50,
  },
})
