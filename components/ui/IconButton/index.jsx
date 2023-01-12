import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({ icon, size, color, handleOnPress }) => {
  return (
    <Pressable
      onPress={handleOnPress}
      style={({ pressed }) => pressed && styles.pressedStyle}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
    marginVertical: 2,
  },
  pressedStyle: {
    opacity: 0.75,
  },
})
