import CustomButton from "@/components/ui/Button";
import Input from "@/components/ui/inputField";
import { Typography } from "@/components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";
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
        secureTextEntry
        rightIcon={<Ionicons name="eye" size={20} color="#6A0066"/>}
      />
      <View style={{ height: 36 }} />
      <Input
        label="Confirm new password"
        placeholder="repeat password"
        autoCapitalize="none"
        keyboardType="email-address"
        secureTextEntry
        rightIcon={<Ionicons name="eye" size={20} color="#6A0066"/>}
      />

      <View style={{ height: 27 }} />

      <CustomButton
        title="Reset password"
        variant="primary"
        size="large"
        onPress={() => push("/(otpInput)/passwordChanged")}
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
