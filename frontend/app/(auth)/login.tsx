import { Link } from 'expo-router';
import * as React from 'react'
import { View, Image } from "react-native";
import { Text, TextInput, Button } from 'react-native-paper'

export default function login() {
    const logo = require("@/assets/images/splash.png")
    const[username, setUsername] = React.useState("")
    const[password, setPassword] = React.useState("")
    return (
        <View
        style={{
            backgroundColor: '#027361',
            paddingTop: 20,
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
                width: '80%',
                paddingHorizontal: 12,
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
                onChangeText={(username) => setUsername(username)}
                value={username}
                mode="outlined"/>
                <TextInput label={"Password"} style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    marginHorizontal: 10,
                    marginVertical: 10,
                    width: "90%"
                }}
                onChangeText={(password) => setPassword(password)}
                value={password}
                mode="outlined"/>

                <Button mode="contained" style={{
                    backgroundColor: "#027361",
                    width: "80%",
                    marginVertical: 20
                }} onPress={() => console.log('Pressed')}>
                    Login
                </Button>
                <Text variant="bodySmall" style={{ marginTop: 20, textAlign: 'center'}}>Don't have an account?<Link href={"/register"} style={{ fontWeight: 'bold'}}> Register Now</Link></Text>
            </View>
        </View>
    )
}
