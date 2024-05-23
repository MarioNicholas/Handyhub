import { Link } from 'expo-router';
import * as React from 'react'
import { View, Image } from "react-native";
import { Text, TextInput, Button } from 'react-native-paper'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function login() {
    const usernameRef = React.useRef<HTMLInputElement>(null)
    const passwordRef = React.useRef<HTMLInputElement>(null)

    const loginHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const enteredUsername = usernameRef.current!.value;
        const enteredPassword = passwordRef.current!.value;

        try {
          const response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            body: JSON.stringify({
              username: enteredUsername,
              password: enteredPassword,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.status === 422) {
            throw new Error();
          }
    
          if (response.status !== 200 && response.status !== 201) {
            throw new Error();
          }
    
          const result = await response.json();
          await AsyncStorage.setItem("token", result.token);
          await AsyncStorage.setItem("userId", result.userId);
          const remainingMilisecond = 60 * 60 * 1000;
          const expiryDate = new Date().getTime() + remainingMilisecond;
          await AsyncStorage.setItem("expiryDate", expiryDate.toString());
        } catch (err) {
          console.log(err);
        }
      };
      
    const logo = require("@/assets/images/splash.png")
    return (
        <View
        style={{
            backgroundColor: '#027361',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}
        >
            <Image source={logo} style={{
                width: 200,
                height: 200
            }}/>
            <View style={{
                backgroundColor: '#fff',
                width: '70%',
                borderWidth: 1,
                borderRadius: 16,
                borderColor: '#000',
                height: '60%',
                display: "flex",
                alignItems: "center"
            }}>
                <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 30, textAlign: 'center'}}>Login</Text>
                <TextInput label={"Username"} style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    marginHorizontal: 10,
                    marginVertical: 10,
                    width: "90%"
                }}
                mode="outlined"/>
                <TextInput label={"Password"} style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    marginHorizontal: 10,
                    marginVertical: 10,
                    width: "90%"
                }}
                mode="outlined"/>

                <Button mode="contained" style={{
                    backgroundColor: "#027361",
                    width: "80%",
                    marginVertical: 20
                }} onPress={() => loginHandler}>
                    Login
                </Button>
                <Text variant="bodySmall" style={{ marginTop: 20, textAlign: 'center'}}>Don't have an account?<Link href={"/register"} style={{ fontWeight: 'bold'}}> Register Now</Link></Text>
                
            </View>
        </View>
    )
}
