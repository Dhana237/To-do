import CustomButton from "@/components/ui/Button";
import Input from "@/components/ui/inputField";
import { Typography } from "@/components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { push } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPsw, setViewPsw]=useState(false)

  const login = async(email:string ,password:string)=>{
    
    try{
      const response = await fetch("http://localhost:5000/api/user/login",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          email: email,
          password: password
        })
      })
      const result = await response.json()
      if(response.ok){
        return {success: true, data: result};
      }else{
        return {success:false, message:result.message}
      }

    }catch(error){
      console.log("Login Error:", error);
      return { success: false, message:"Something went wrong"}
      
    }
  }

   const handleLogin = async () => {
    const result = await login(email, password);

    if (result.success) {
      Alert.alert("Success", "Logged in successfully");
      router.push("/(tabs)/home");
    } else {
      Alert.alert("Login Failed", result.message);
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
        Log in
      </Typography>
      <Input
        label="Email"
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(text:any)=>setEmail(text)}
        rightIcon={ 
        <Ionicons name="checkmark-circle" size={24} color="#FF0066"/>}
      />
      <View style={{ height: 34 }} />
      <Input
        label="Password"
        placeholder="Enter your password"
        autoCapitalize="none"
        keyboardType="default"
        value={password}
        onChangeText={(text:any)=>setPassword(text)}
        rightIcon={
        !viewPsw ?
        <Ionicons name="eye-off" size={20} color="#6A0066"/>:
         <Ionicons name="eye" size={20} color="#6A0066"/>
      }
        secureTextEntry={!viewPsw}
        onRightIconPress={()=>setViewPsw(!viewPsw)}
      />
      <View style={{ height: 27 }} />
      <Typography
        variant="light"
        align="right"
        color="#000000"
        size={12}
        lineHeight={50}
        style={{ marginBottom: 38 }}
        onPress={() => push("/(otpInput)/forgetPassword")}
      >
        Forgot Password
      </Typography>
      <CustomButton
        onPress={handleLogin}
        title="Log in"
        variant="primary"
        size="large"
      ></CustomButton>
      <Typography
        variant="regular"
        align="center"
        color="#974A8D"
        size={14}
        lineHeight={50}
        style={{ marginTop: 200 }}
      >
        Don’t have an account?{" "}
        <Typography
          variant="regular"
          color="#6A0066"
          size={14}
          lineHeight={50}
          onPress={() => push("/(auth)/signUp")}
        >
          Sign Up
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
