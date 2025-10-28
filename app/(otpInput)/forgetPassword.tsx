import CustomButton from "@/components/ui/Button";
import Input from "@/components/ui/inputField";
import { Typography } from "@/components/ui/Typography";
import { push } from "expo-router/build/global-state/routing";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function login() {
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
      />

      <View style={{ height: 27 }} />

      <CustomButton
        title="Send code"
        variant="primary"
        size="large"
        onPress={() => push("/(otpInput)/verify")}
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
