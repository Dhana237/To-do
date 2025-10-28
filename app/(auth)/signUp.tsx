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
        style={{
          width: 46,
          height: 44,
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
        Create account
      </Typography>
      <Input
        label="User Name"
        placeholder="Enter your name"
        autoCapitalize="none"
        keyboardType="default"
      />
      <View style={{ height: 34 }} />
      <Input
        label="Email"
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={{ height: 34 }} />
      <Input
        label="Password"
        placeholder="Enter your password"
        autoCapitalize="none"
        keyboardType="email-address"
        secureTextEntry
      />
      <View style={{ height: 27 }} />
      <Typography
        variant="light"
        align="left"
        color="#000000"
        size={12}
        lineHeight={50}
        style={{ marginBottom: 38 }}
      >
        I accept the terms and privacy policy
      </Typography>
      <CustomButton
        title="Sign Up"
        variant="primary"
        size="large"
      ></CustomButton>
      <Typography
        variant="regular"
        align="center"
        color="#974A8D"
        size={14}
        lineHeight={50}
        style={{ marginTop: 64 }}
      >
        Already have an account?{" "}
        <Typography
          variant="regular"
          color="#6A0066"
          size={14}
          lineHeight={50}
          onPress={() => push("/(auth)/login")}
        >
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
