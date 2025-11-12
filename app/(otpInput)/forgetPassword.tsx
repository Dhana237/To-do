import CustomButton from "@/components/ui/Button";
import Input from "@/components/ui/inputField";
import { Typography } from "@/components/ui/Typography";
import { router } from "expo-router";
import { push } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";

export default function ForgetPassword() {
const [email, setEmail] = useState("");
      const sentOtp = async () =>{
        try {
          const response = await fetch("http://localhost:5000/api/user/forgot-password",{
            method: "POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({ email }),
          });
          const result = await response.json();
          console.log(result);
          if(result.success){
            Alert.alert("Success", "OTP sent to your email");
            router.push({ pathname:"/(otpInput)/verify", params:{email}})
          } else {
            Alert.alert("Failed", result.message)
          }
          
        } catch (error) {
          console.log("Forgot Password Error:", error);
          Alert.alert("Error", "Something went wrong") 
        }
      }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Star.png")}
        style={{ width: 46, height: 44, marginBottom: 39, alignSelf: 'flex-end', }}
      />
      <Typography
        variant="bold"
        align="left"
        color="#6A0066"
        size={30}
        lineHeight={50}
      >
        Forgot password?
      </Typography>
      <Typography
        variant="light"
        align="left"
        color="#934790"
        size={16}
        style={{ marginBottom: 38, marginTop: 13 }}
      >
        Don’t worry! It happens. Please enter the email associated with your
        account.
      </Typography>
      <Input
        label="Email"
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(email:any)=>setEmail(email)}
        value={email}
        
      />

      <View style={{ height: 27 }} />

      <CustomButton
        title="Send code"
        variant="primary"
        size="large"
        onPress={sentOtp}
      ></CustomButton>
      <Typography
        variant="regular"
        align="center"
        color="#974A8D"
        size={14}
        lineHeight={50}
        style={{ marginTop: 240 }}
      >
        Remember password?{" "}
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
