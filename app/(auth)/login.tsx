import CustomButton from '@/components/ui/Button'
import Input from '@/components/ui/inputField'
import { Typography } from '@/components/ui/Typography'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function login() {
  return (
    <View style={styles.container}>
        <Typography variant="bold" align="center" color="#6A0066" size={30} lineHeight={50}>
          Log in
        </Typography>
        <Input
          label="Email"
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          autoCapitalize="none"
          keyboardType="email-address"
          secureTextEntry
        />
        <Typography variant="light" align="right" color="#000000" size={12} lineHeight={50}>
          Forgot Password
        </Typography>
         <CustomButton
            title="Log in"
            variant="primary"
            size="large"
          ></CustomButton>
          <Typography variant="regular" align="center" color="#974A8D" size={14} lineHeight={50}>
          Don’t have an account?  <Typography variant="regular" align="center" color="#6A0066" size={14} lineHeight={50}>
          Sign Up
          
        </Typography>

        </Typography>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#FFF5E7",
    flex:1,
    justifyContent:"center",
    padding:20

  }
})