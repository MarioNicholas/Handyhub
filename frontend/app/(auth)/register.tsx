import { Link } from "expo-router";
import * as React from "react";
import { View, Image, ScrollView } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

export default function register() {
  const logo = require("@/assets/images/splash.png");
  return (
    <View
      style={{
        backgroundColor: "#027361",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: 90,
      }}
    >
      <Image
        source={logo}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <ScrollView
        style={{
          backgroundColor: "#fff",
          width: "70%",
          borderWidth: 1,
          borderRadius: 16,
          borderColor: "#000",
          height: "60%",
        }}
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          variant="headlineLarge"
          style={{
            fontWeight: "bold",
            marginTop: 20,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Register
        </Text>
        <TextInput
          label={"Full Name"}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            width: "90%",
          }}
          mode="outlined"
        />
        <TextInput
          label={"Email"}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            width: "90%",
          }}
          mode="outlined"
        />
        <TextInput
          label={"Phone Number"}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            width: "90%",
          }}
          mode="outlined"
        />
        <TextInput
          label={"Address"}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            width: "90%",
          }}
          mode="outlined"
        />
        <TextInput
          label={"Username"}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            width: "90%",
          }}
          mode="outlined"
        />

        <TextInput
          label={"Password"}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            width: "90%",
          }}
          mode="outlined"
        />

        <Button
          mode="contained"
          style={{
            backgroundColor: "#027361",
            width: "80%",
            marginVertical: 20,
          }}
          onPress={() => console.log("Pressed")}
        >
          Register
        </Button>
        <Text
          variant="bodySmall"
          style={{ marginTop: 20, textAlign: "center", paddingBottom: 30 }}
        >
          Already have an account?
          <Link href={"/login"} style={{ fontWeight: "bold" }}>
            {" "}
            Login Here
          </Link>
        </Text>
      </ScrollView>
    </View>
  );
}
