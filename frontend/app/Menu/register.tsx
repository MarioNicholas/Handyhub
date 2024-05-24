import { Link, useRouter } from "expo-router";
import * as React from "react";
import { View, Image, ScrollView, GestureResponderEvent } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const[email, setEmail]=React.useState("")
  const[name, setName]=React.useState("")
  const[phoneNumber, setPhoneNumber]=React.useState("")
  const[address, setAddress]=React.useState("")
  const[username, setUsername]=React.useState("")
  const[password, setPassword]=React.useState("")
  const router =useRouter()

  const signupHandler = async (event: GestureResponderEvent) => {
    event.preventDefault();
    console.log(name);
    
    try {
      const response = await fetch("http://192.168.1.13:8000/auth/signup", {
        method: "PUT",
        body: JSON.stringify({
          email: email,
          name: name,
          phoneNumber: phoneNumber,
          address: address,
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 422) {
        throw new Error("halo");
      }

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("ini juga halo");
      }

      const result = await response.json();
      console.log(result);
      router.replace("/Menu/registered")
    } catch (error) {
      console.log(error);
    }
  };

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
          width: "85%",
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
          onChangeText={(name)=>setName(name)}
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
          onChangeText={(email)=>setEmail(email)}
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
          onChangeText={(phone)=>setPhoneNumber(phone)}
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
          onChangeText={(address)=>setAddress(address)}
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
          onChangeText={(username)=>setUsername(username)}
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
          onChangeText={(password)=>setPassword(password)}
          mode="outlined"
        />

        <Button
          mode="contained"
          style={{
            backgroundColor: "#027361",
            width: "80%",
            marginVertical: 20,
          }}
          onPress={signupHandler}
        >
          Register
        </Button>
        <Text
          variant="bodySmall"
          style={{ marginTop: 20, textAlign: "center", paddingBottom: 30 }}
        >
          Already have an account?
          <Link href={"Menu/login"} style={{ fontWeight: "bold" }}>
            Login Here
          </Link>
        </Text>
      </ScrollView>
    </View>
  );
}
