import CustomButton from "@/components/ui/Button";
import Input from "@/components/ui/inputField";
import { Typography } from "@/components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { push } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword]=useState('')
  const {email} = useLocalSearchParams()

  const handleResetPassword = async()=>{
    if (!password || !confirmPassword) {
      Alert.alert("Error", "please fill in both fields")
      return
    }
    if (password !==confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }
    try {
      const response = await fetch("http://localhost:5000/api/user/reset-password",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          newPassword: password
        })
      })

      const data = await response.json()
      if (response.ok) {
        Alert.alert("Success", data.message)
        push("/(otpInput)/passwordChanged")
      } else {
        Alert.alert("Error",data.message|| "something went wrong")
      }
    } catch (error) {
      console.log("Reset password error:", error);
      Alert.alert("Error", "Failed to connect to server")
      
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Star.png")}
        style={{
          width: 46,
          height: 44,
          marginBottom: 39,
          alignSelf: "flex-end",
        }}
      />
      <Typography
        variant="bold"
        align="left"
        color="#6A0066"
        size={30}
        lineHeight={50}
      >
        Reset password
      </Typography>
      <View style={{ height: 16 }} />
      <Typography
        variant="light"
        align="left"
        color="#934790"
        size={16}
        style={{ marginBottom: 38 }}
      >
        Please type something you’ll remember
      </Typography>
      <Input
        label="New Password"
        placeholder="must be 8 characters"
        autoCapitalize="none"
        keyboardType="email-address"
        value={password}
        onChangeText={(password:any)=>setPassword(password)}
        secureTextEntry
        rightIcon={<Ionicons name="eye" size={20} color="#6A0066"/>}
      />
      <View style={{ height: 36 }} />
      <Input
        label="Confirm new password"
        placeholder="repeat password"
        autoCapitalize="none"
        keyboardType="email-address"
        value={confirmPassword}
        onChangeText={(confirmPassword:any)=>setConfirmPassword(confirmPassword)}
        secureTextEntry
        rightIcon={<Ionicons name="eye" size={20} color="#6A0066"/>}
      />

      <View style={{ height: 27 }} />

      <CustomButton
        title="Reset password"
        variant="primary"
        size="large"
        onPress={handleResetPassword}
      ></CustomButton>
      <Typography
        variant="regular"
        align="center"
        color="#974A8D"
        size={14}
        lineHeight={50}
        style={{ marginTop: 240 }}
      >
        Remember Old Password?{" "}
        <Typography variant="bold" color="#6A0066" size={14} lineHeight={50} onPress={()=>push("/(auth)/login")}>
          Log in
        </Typography>
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF5E7",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
