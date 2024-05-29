import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, View, GestureResponderEvent } from 'react-native'
import { Button, RadioButton, Text, TextInput } from 'react-native-paper'

export default function Apply() {
    const[serviceName, setServiceName] = useState("")
    const[category, setCategory] = useState("")
    const[city, setCity] = useState("")
    const[price, setPrice] = useState(0)
    const[specialty, setSpecialty] = useState("")
    const[description, setDescription] = useState("")
    const[token, setToken] = useState<string|null>("")

    const tokenChecker = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            //route ke login
        }

        setToken(token);
    }

    React.useEffect(() => {
        tokenChecker();
    }, [])

    const navigation = useNavigation()

    const submitHandler = async (event: GestureResponderEvent) => {
        
        event.preventDefault();

        try {
            const response = await fetch("http://192.168.1.13:8000/admin/add-service", {
                method: "POST",
                body: JSON.stringify({
                    name: serviceName,
                    price: price,
                    city: city,
                    category: category,
                    description: description,
                    specialty: specialty,
                }),
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: "Bearer " + token
                }
            });

            if (response.status === 422) {
                throw new Error()
            }

            if (response.status !== 200 && response.status !== 201) {
                throw new Error()
            }

            const result = await response.json()
            console.log(result);
            //redirect
            navigation.navigate("Home" as never)
        } catch (err) {
            console.log(err)
        }
    }
    
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
            onChangeText={(name) => {setServiceName(name)}}
            mode="outlined"/>
            <View style={{
                backgroundColor: "#fff",
                marginHorizontal: 10,
                marginVertical: 10,
                width: "90%",
                padding: 10,
                borderRadius: 10,
                borderColor: "#027361",
                borderWidth: 1.5,
            }}>
                <Text style={{
                    fontWeight: "bold",
                    marginBottom: 10
                }}>Category</Text>
                <RadioButton.Group onValueChange={value => setCategory(value)} value={category}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Electronics"/>
                        <Text>Electronics</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Plumbing" />
                        <Text>Plumbing</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Cleaning" />
                        <Text>Cleaning</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Renovation"/>
                        <Text>Renovation</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Gardening" />
                        <Text>Gardening</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Relocation" />
                        <Text>Relocation</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Others" />
                        <Text>Others</Text>
                    </View>
                </RadioButton.Group>
            </View>
            <TextInput label={"City"} style={{
                backgroundColor: "#fff",
                marginHorizontal: 10,
                marginVertical: 10,
                width: "90%"
            }} outlineStyle={{
                borderRadius: 10,
                borderColor: "#027361",
                borderWidth: 1.5,
            }}
            onChangeText={(city) => {setCity(city)}}
            mode="outlined"/>
            <TextInput label={"Price"} style={{
                backgroundColor: "#fff",
                marginHorizontal: 10,
                marginVertical: 10,
                width: "90%"
            }} outlineStyle={{
                borderRadius: 10,
                borderColor: "#027361",
                borderWidth: 1.5,
            }}
            keyboardType='numeric'
            onChangeText={(price) => {setPrice(price)}}
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
            onChangeText={(specialty) => {setSpecialty(specialty)}}
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
            onChangeText={(description) => {setDescription(description)}}
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
                marginBottom: 20,
            }}
                onPress={submitHandler}
            >
                <Text style={{
                    color: "#fff",
                }}>
                    Apply Service
                </Text>
            </Button>
        </ScrollView>
    )
}
