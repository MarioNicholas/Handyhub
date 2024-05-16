import { Link } from "expo-router";
import { View, Image } from "react-native";
import * as React from 'react';
import { Text } from 'react-native-paper'
import Navbar from "@/components/navigation/Navbar";
import Card from "@/components/Card";

export default function Index() {
  const Hero = require("@/assets/images/banner.png")
  const ServicesPlaceholder = require("@/assets/images/plumbing.png")

  return (
    <View
      style={{
        paddingTop: 40,
        paddingHorizontal: 30
      }}
    >
      <Navbar />
      <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Welcome!</Text>
      <View style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        <Image source={Hero} style={{width: 330, height: 170}}/>
      </View>
      <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Services</Text>
      
      <View style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        <Image source={ServicesPlaceholder} style={{width: 62, height: 69}}/>
      </View>
      
      <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Featured</Text>
      <Card name="Alan Smith" role="Hedge Specialist" rating={4.9} jobs={120} price={120000}/>
      
      <Link href={"auth/login"}>Login</Link>
          </View>
  );
}
