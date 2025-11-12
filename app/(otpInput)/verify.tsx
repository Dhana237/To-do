// Verify.tsx
import CustomButton from "@/components/ui/Button";
import OTPInput from "@/components/ui/OtpInput";
import { Typography } from "@/components/ui/Typography";
import { useLocalSearchParams } from "expo-router";
import { push } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";

type AppState = {
  otp: string;
  error: boolean;
  
}

export default function Verify() {
  const [state, setState] = useState<AppState>({
    otp: '',
    error: false,
  });

  const {email} = useLocalSearchParams()

  const handleOTPComplete = (code: string) => {
    console.log('OTP Complete:', code);
    setState(prev => ({ ...prev, otp: code }));
    
    // Simulate verification
    if (code === '1234') { // Changed to 4 digits to match your length
      Alert.alert('Success', 'OTP verified successfully!');
      setState(prev => ({ ...prev, error: false }));
      // Navigate after successful verification
      setTimeout(() => {
        push("/(otpInput)/resetPassword");
      }, 1000);
    } else {
      setState(prev => ({ ...prev, error: true }));
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const verifyOtp = async(email:any, otp:string)=>{
    try {
      const response = await fetch("http://localhost:5000/api/user/verify-otp",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({email, otp}),
      })
      const result = await response.json()
      console.log("OTP verify Result:", result);
      if (response.ok && result.success) {
        Alert.alert("Success", result.message || "OTP verified successfully!")
        setTimeout(()=>{
          push({pathname: "/(otpInput)/resetPassword",params:{email}})
        },1000)
      } else {
        setState(prev => ({...prev, error:true}));
        Alert.alert("Error", result.message || "Invalid or expired OTP")
      }
    } catch (error) {
      console.log("OTP Verification Error:", error);
      Alert.alert("Error", "Network error or server not responding")
    }
  }

const handleVerifyPress = async()=>{
  if (state.otp.length===4) {
    await verifyOtp(email , state.otp)
  } else {
    Alert.alert("Error", "Please enter the complete 4-digit OTP")
  }
}

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Star.png")}
        style={styles.starImage}
      />
      
      <Typography
        variant="bold"
        align="left"
        color="#6A0066"
        size={30}
        lineHeight={50}
      >
        Please check your email
      </Typography>
      
      <View style={{ marginTop: 52 }} />
      
      <Typography
        variant="light"
        align="left"
        color="#934790"
        size={16}
        style={{ marginBottom: 38 }}
      >
        We&apos;ve sent a code to{" "}
        <Typography
          variant="bold"
          align="left"
          color="#934790"
          size={16}
        >
          helloworld@gmail.com
        </Typography>
      </Typography>
    
      <OTPInput
        length={4}
        onComplete={handleOTPComplete}
        autoFocus={true}
        focusedInputStyle={styles.focusedInput}
      />
     
      {state.error && (
        <Typography
          variant="light"
          align="center"
          color="#FF3B30"
          size={14}
          style={styles.errorText}
        >
          Invalid OTP. Please try again.
        </Typography>
      )}

      <View style={{ height: 27 }} />

      <CustomButton
        title="Verify"
        variant="primary"
        size="large"
        onPress={handleVerifyPress}
      />
      
      <Typography
        variant="bold"
        align="center"
        color="#974A8D"
        size={14}
        lineHeight={50}
      >
        Send code again:{" "}
        <Typography variant="light" color="#6A0066" size={14} lineHeight={50}>
          00:02
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
  starImage: {
    width: 46,
    height: 44,
    marginBottom: 39,
    alignSelf: "flex-end",
  },
  focusedInput: {
    borderColor: '#6A0066',
  },
  errorText: {
    marginTop: 16,
    marginBottom: 8,
  },
});