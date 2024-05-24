import { Link } from 'expo-router';
import * as React from 'react'
import { View, Image, ScrollView } from "react-native";
import { Text, TextInput, Button } from 'react-native-paper'

export default function register() {
    const logo = require("@/assets/images/splash.png")
    const[name, setName] = React.useState("")
    const[email, setEmail] = React.useState("")
    const[address, setAddress] = React.useState("")
    const[phone, setPhone] = React.useState("")
    const[username, setUsername] = React.useState("")
    return (
        <View
        style={{
            backgroundColor: '#027361',
            paddingTop: 20,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingBottom: 90
        }}
        >
            <Image source={logo} style={{
                width: 200,
                height: 200
            }}/>
            <ScrollView style={{
                backgroundColor: '#fff',
                width: '80%',
                paddingHorizontal: 12,
                borderWidth: 1,
                borderRadius: 16,
                borderColor: '#000',
                height: '60%',
            }}
                contentContainerStyle={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 30, textAlign: 'center'}}>Register</Text>
                <TextInput label={"Full Name"} style={{
                    backgroundColor: "#fff",
                    marginHorizontal: 10,
                    marginVertical: 10,
                    width: "90%"
                }} outlineStyle={{
                    borderRadius: 10,
                }}
                onChangeText={(name) => setName(name)}
                value={name}
                mode="outlined"/>
                <TextInput label={"Email"} style={{
                    backgroundColor: "#fff",
                    marginHorizontal: 10,
                    marginVertical: 10,
                    width: "90%"
                }} outlineStyle={{
                    borderRadius: 10,
                }}
                onChangeText={(email) => setEmail(email)}
                value={email}
                mode="outlined"/>
                <TextInput label={"Phone Number"} style={{
                    backgroundColor: "#fff",
                    marginHorizontal: 10,
                    marginVertical: 10,
                    width: "90%"
                }} outlineStyle={{
                    borderRadius: 10,
                }}
                onChangeText={(phone) => setPhone(phone)}
                value={phone}
                mode="outlined"/>
                <TextInput label={"Address"} style={{
                    backgroundColor: "#fff",
                    marginHorizontal: 10,
                    marginVertical: 10,
                    width: "90%"
                }} outlineStyle={{
                    borderRadius: 10,
                }}
                onChangeText={(address) => setAddress(address)}
                value={address}
                mode="outlined"/>
                <TextInput label={"Username"} style={{
                    backgroundColor: "#fff",
                    marginHorizontal: 10,
                    marginVertical: 10,
                    width: "90%"
                }} outlineStyle={{
                    borderRadius: 10,
                }}
                onChangeText={(username) => setUsername(username)}
                value={username}
                mode="outlined"/>

                <Button mode="contained" style={{
                    backgroundColor: "#027361",
                    width: "80%",
                    marginVertical: 20
                }} onPress={() => console.log('Pressed')}>
                    Register
                </Button>
                <Text variant="bodySmall" style={{ marginTop: 20, textAlign: 'center', paddingBottom: 30}}>Already have an account?<Link href={"/login"} style={{ fontWeight: 'bold'}}> Login Here</Link></Text>
                
            </ScrollView>
        </View>
    )
}
