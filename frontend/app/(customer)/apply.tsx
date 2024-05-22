import React from 'react'
import { ScrollView } from 'react-native'
import { Text, TextInput } from 'react-native-paper'

export default function apply() {
  return (
    <ScrollView style={{
        display: "flex",
    }} contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
    }}>
        <Text variant='headlineLarge' style={{
            fontWeight: "bold",
            marginVertical: 20
        }}>Apply Service</Text>
        <TextInput label={"Service Name"} style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            borderColor: "#027361",
            width: "90%"
        }}
        mode="outlined"/>
        <TextInput label={"Category"} style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            borderColor: "#027361",
            width: "90%"
        }}
        mode="outlined"/>
        <TextInput label={"Rate"} style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            borderColor: "#027361",
            width: "90%"
        }}
        mode="outlined"/>
        <TextInput label={"Specialist"} style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            borderColor: "#027361",
            width: "90%"
        }}
        mode="outlined"/>
        <TextInput label={"Description"} style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            borderColor: "#027361",
            width: "90%",
            height: 200,
        }}
        mode="outlined"/>
    </ScrollView>
  )
}
