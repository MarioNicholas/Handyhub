import Card from '@/components/Card'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'

interface Renovations{
    _id: string,
    name: string,
    price: number,
    description: string,
    city: string,
    provider: string,
    category: string,
    specialty: string,
}

interface RenovationsArray extends Array<Renovations>{};

export default function Gardening() {
    const[renovations, setRenovations] = React.useState<RenovationsArray>([])
    const[loading, setLoading] = React.useState(true)
    async function getRenovations() {        
        const response = await fetch("http://192.168.1.13:8000/services/Renovation", {
        });
        const result = await response.json();
        setRenovations(result.services);
        setLoading(false)
        }
        
        React.useEffect(() => {
            getRenovations();
        }, [])

    if(!loading){
        return (
        <SafeAreaView style={{
            paddingHorizontal: 28,
        }}>
            <ScrollView>
                <Text variant='displaySmall' style={{
                    fontWeight: "bold",
                    marginVertical: 20
                }}>
                    Renovations
                </Text>
                {renovations.map((renovation) => (
                    <View style={{
                        marginVertical: 8
                    }}>
                        <Card props={renovation} key={renovation._id}/>
                    </View>
                    )                    
                )}
            </ScrollView>
        </SafeAreaView>
        )
    } else {
        return (
            <Text>Loading...</Text>
        )
    }
}

