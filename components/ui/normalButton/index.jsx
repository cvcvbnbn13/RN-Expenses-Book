import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

import { GlobalStyles } from '../../../constants/styles'

const NormalButton = ({ children, handleOnPress, mode, propsStyle }) => {
  return (
    <View style={propsStyle}>
      <Pressable
        onPress={handleOnPress}
        style={({ pressed }) => pressed && styles.pressedStyle}
      >
        <View style={[styles.buttonStyle, mode === 'flat' && styles.flatStyle]}>
          <Text
            style={[
              styles.buttonTextStyle,
              mode === 'flat' && styles.flatTextStyle,
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default NormalButton

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flatStyle: {
    backgroundColor: 'transparent',
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  flatTextStyle: {
    color: GlobalStyles.colors.primary200,
  },
  pressedStyle: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
})
