import { Link } from "expo-router";
import { View, Image } from "react-native";
import * as React from 'react';
import { Text } from 'react-native-paper'
import Navbar from "@/components/navigation/Navbar";
import BottomNavbar from "@/components/navigation/BottomNavbar";

export default function Index() {
  const Hero = require("@/assets/images/banner.png")
  const ServicesPlaceholder = require("@/assets/images/services-placeholder.png")

  return (
    <View
      style={{

      }}
    >
      <Navbar/>
      <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 10, marginHorizontal: 30}}>Welcome!</Text>
      <View style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        <Image source={Hero} style={{width: 330, height: 170}}/>
      </View>
      <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 10, marginHorizontal: 30}}>Services</Text>
      
      <View style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        <Image source={ServicesPlaceholder} style={{width: 355, height: 157}}/>
      </View>
      
      <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 10, marginHorizontal: 30}}>Features</Text>
      <Link href={"/login"}>Login</Link>
      
      <BottomNavbar/>
    </View>
  );
}
