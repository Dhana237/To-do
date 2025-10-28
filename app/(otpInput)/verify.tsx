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
        Please check your email
      </Typography>
      <View style={{ marginTop: 52 }}></View>
      <Typography
        variant="light"
        align="left"
        color="#934790"
        size={16}
        style={{ marginBottom: 38 }}
      >
        We’ve sent a code to{" "}
        <Typography
          variant="bold"
          align="left"
          color="#934790"
          size={16}
          style={{ marginBottom: 38, marginTop: 52 }}
        >
          helloworld@gmail.com
        </Typography>
      </Typography>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input
          autoCapitalize="none"
          keyboardType="name-phone-pad"
          style={{ width: 77, height: 77, borderWidth: 1, borderRadius: 38 }}
        />
        <Input
          autoCapitalize="none"
          keyboardType="name-phone-pad"
          style={{ width: 77, height: 77, borderWidth: 1, borderRadius: 38 }}
        />
        <Input
          autoCapitalize="none"
          keyboardType="name-phone-pad"
          style={{ width: 77, height: 77, borderWidth: 1, borderRadius: 38 }}
        />
        <Input
          autoCapitalize="none"
          keyboardType="name-phone-pad"
          style={{ width: 77, height: 77, borderWidth: 1, borderRadius: 38 }}
        />
      </View>

      <View style={{ height: 27 }} />

      <CustomButton
        title="Verify"
        variant="primary"
        size="large"
        onPress={() => push("/(otpInput)/resetPassword")}
      ></CustomButton>
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
});
