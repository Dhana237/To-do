import CustomButton from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { push } from "expo-router/build/global-state/routing";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function index() {
   

  return (
    <>
      <View style={[styles.container]}>
        <View style={{ paddingHorizontal: 36, paddingBottom:36, alignItems:"center"}}>
          <Image
            // style={styles.image}
            source={require("@/assets/images/image1.png")}
          ></Image>
          <Typography variant="bold" align="center" color="#FFF5E7" size={32}>
            Easiest way to manage your task!
          </Typography>
          <Typography
            variant="light"
            align="center"
            color="#FFF5E7"
            size={18}
            lineHeight={24}
            style={{ marginTop: 48, textAlign: "center", marginHorizontal: 50 }}
          >
            Organized all your tasks in list and project to help you build new
            habits
          </Typography>
        </View>

        <View style={styles.subContainer}>
          <CustomButton
          onPress={()=>push("/(auth)/login")}
            title="Sign in"
            variant="primary"
            size="large"
          ></CustomButton>
          <CustomButton
            title="Create account"
            variant="secondary"
            size="large"
          ></CustomButton>
          <Typography
            variant="light"
            align="center"
            color="#974A8D"
            size={18}
            style={{ textAlign: "center", marginTop: 20 }}
          >
            Use the app without internet?{" "}
            <Typography color="#6A0066" size={16} variant="bold">
              Skip
            </Typography>
          </Typography>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF0066",
    flex: 1,
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#FFF5E7",
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    bottom: 0,
    padding: 26,
  },
});
