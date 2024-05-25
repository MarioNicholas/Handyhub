import Card from '@/components/Card'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'

interface Gardenings{
  name: string,
  price: number,
  description: string,
  city: string,
  provider: string,
  category: string,
  specialty: string,
}

interface GardeningsArray extends Array<Gardenings>{};

export default function Gardening() {
    const[gardenings, setGardenings] = React.useState<GardeningsArray>([])
    const[loading, setLoading] = React.useState(true)
    async function getGardenings() {        
        const response = await fetch("http://192.168.1.13:8000/service/Gardening", {
        });
        const result = await response.json();
        setGardenings(result.gardening);
        setLoading(false)
        }
              
        React.useEffect(() => {
            getGardenings();
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
            {gardenings.map((gardening) => (
                <View style={{
                    marginVertical: 8
                }}>
                    <Card props={gardening} />
                </View>
                )                    
            )}
        </ScrollView>
    </SafeAreaView>
    )
}

