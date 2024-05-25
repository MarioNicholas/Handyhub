import Card from '@/components/Card'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'

interface Electronics{
    _id: string,
    name: string,
    price: number,
    description: string,
    city: string,
    provider: string,
    category: string,
    specialty: string,
}

interface ElectronicsArray extends Array<Electronics>{};

export default function Electronics() {
    const[electronics, setElectronics] = React.useState<ElectronicsArray>([])
    const[loading, setLoading] = React.useState(true)
    async function getElectronics() {        
        const response = await fetch("http://192.168.1.13:8000/services/Electronics", {
        });
        const result = await response.json();
        setElectronics(result.services);
        setLoading(false)
        }
        
        console.log(electronics);
        
        
        React.useEffect(() => {
            getElectronics();
        }, [])
    return (
        <SafeAreaView style={{
            paddingHorizontal: 28,
        }}>
            <ScrollView>
                <Text variant='displaySmall' style={{
                    fontWeight: "bold",
                    marginVertical: 20
                }}>
                    Electronics
                </Text>
                {electronics.map((electronic) => (
                    <View style={{
                        marginVertical: 8
                    }}>
                        <Card props={electronic} key={electronic._id}/>
                    </View>
                    )                    
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

