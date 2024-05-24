import { Link } from 'expo-router'
import React from 'react'
import { ScrollView } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'

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
                marginHorizontal: 10,
                marginVertical: 10,
                width: "90%"
            }} outlineStyle={{
                borderRadius: 10,
                borderColor: "#027361",
                borderWidth: 1.5,
            }}
            mode="outlined"/>
            <TextInput label={"Category"} style={{
                backgroundColor: "#fff",
                marginHorizontal: 10,
                marginVertical: 10,
                width: "90%"
            }} outlineStyle={{
                borderRadius: 10,
                borderColor: "#027361",
                borderWidth: 1.5,
            }}
            mode="outlined"/>
            <TextInput label={"Rate"} style={{
                backgroundColor: "#fff",
                marginHorizontal: 10,
                marginVertical: 10,
                width: "90%"
            }} outlineStyle={{
                borderRadius: 10,
                borderColor: "#027361",
                borderWidth: 1.5,
            }}
            mode="outlined"/>
            <TextInput label={"Specialty"} style={{
                backgroundColor: "#fff",
                marginHorizontal: 10,
                marginVertical: 10,
                width: "90%"
            }} outlineStyle={{
                borderRadius: 10,
                borderColor: "#027361",
                borderWidth: 1.5,
            }}
            mode="outlined"/>
            <TextInput label={"Description"} style={{
                backgroundColor: "#fff",
                marginHorizontal: 10,
                marginVertical: 10,
                width: "90%"
            }} outlineStyle={{
                borderRadius: 10,
                borderColor: "#027361",
                borderWidth: 1.5,
            }} multiline={true}
            mode="outlined"/>
            <Text variant='bodyLarge' style={{
                fontWeight: "bold",
                marginVertical: 20,
                textAlign:"left"
            }}>Upload Picture</Text>
            <Button style={{
                backgroundColor: "#027361",
                paddingHorizontal: 24,
                paddingVertical: 4,
            }}>
                <Text style={{
                    color: "#fff",
                }}>
                    Apply Service
                </Text>
            </Button>
            <Link href={"/confirmation"}>confirm</Link>
        </ScrollView>
    )
}
