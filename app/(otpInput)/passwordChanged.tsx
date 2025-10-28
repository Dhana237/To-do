import CustomButton from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { push } from "expo-router/build/global-state/routing";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function login() {
  return (
    <View style={styles.container}>
      <Image
          source={require('@/assets/images/logo.png')}
          style={{ width: 91, height: 84, alignSelf: 'center', marginBottom:39}}
        />
      <Typography
        variant="bold"
        align="center"
        color="#6A0066"
        size={30}
        lineHeight={50}
      >
        Password changed
      </Typography>
      <Typography
        variant="light"
        align="center"
        color="#934790"
        size={16}
        style={{ marginBottom: 38, paddingHorizontal: 68, marginTop: 10 }}
      >
        Your password has been changed succesfully
      </Typography>
      <CustomButton
        title="Back to login"
        variant="primary"
        size="large"
        onPress={()=>push("/(auth)/login")}
      ></CustomButton>
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
