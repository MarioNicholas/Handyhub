import React from 'react'
import { Button, Text } from 'react-native-paper';
import { View, Image, ScrollView } from "react-native";
import AddressCard from '@/components/AddressCard';


export default function Profile() {
  const avatar = require("@/assets/images/Bob.png")
  const address=[
    {
      name: "Home",
      phone: "0812345679",
      address: "Jalan Genteng No 123 RT 1 / RW 2, Kelurahan A, Kecamatan B, 40131, Bandung, Jawa Barat",
    },
    {
      name: "Kos",
      phone: "0812345679",
      address: "Jalan Genteng No 123 RT 1 / RW 2, Kelurahan A, Kecamatan B, 40131, Bandung, Jawa Barat",
    }
  ]
  return (
    <ScrollView style={{
      display:"flex",
      paddingHorizontal: 32,
      flexGrow: 1
    }} contentContainerStyle={{
      justifyContent: "center",
      alignItems: "center",
    }}>
        <View style={{
          paddingTop: 20,
          marginBottom: 20,
        }}>
          <Image source={avatar} style={{borderRadius: 30}}/>
        </View>
        {/* <Text variant='displaySmall' style={{
          color: "#027361",
          fontWeight: "bold",
          marginVertical: 4,
        }}>Owenn</Text> */}
        <View style={{
          display: "flex",
          flexDirection: "column",
          width: "100%"
        }}>
          {/* nama */}
          <Text variant='bodyMedium' style={{
            color: "#3E5155",
            fontWeight: "bold",
          }}>Name</Text>
          <Text variant='titleMedium' style={{
            color: "#027361",
            fontWeight: "bold",
            marginBottom: 20,
            borderBottomColor: "#3E5155",
            borderBottomWidth: 1,
          }}>Nicolas Owen Halim</Text>

          {/* no hp */}
          <Text variant='bodyMedium' style={{
            color: "#3E5155",
            fontWeight: "bold",
          }}>Phone Number</Text>
          <Text variant='titleMedium' style={{
            color: "#3E5155",
            marginBottom: 20,
            borderBottomColor: "#3E5155",
            borderBottomWidth: 1,
          }}>0812032121</Text>

          {/* email */}
          <Text variant='bodyMedium' style={{
            color: "#3E5155",
            fontWeight: "bold",
          }}>Email</Text>
          <Text variant='titleMedium' style={{
            color: "#3E5155",
            marginBottom: 20,
            borderBottomColor: "#3E5155",
            borderBottomWidth: 1,
          }}>owenganteng@gmail.com</Text>

          {/* password?! */}

          {/* address list title */}
          <View style={{
            display:"flex",
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}>
            <Text variant='bodyMedium' style={{
              color: "#3E5155",
              fontWeight: "bold",
            }}>Address List</Text>
            <Button style={{
              backgroundColor: "#027361",
              paddingHorizontal: 8,
              paddingVertical: 2
            }}>
              <Text style={{
                color: "white"
              }}>Add Address</Text>
            </Button>
          </View>
          {/* list address */}
          {address.map((item)=>{
            return (
              <AddressCard props={item} key={item.name}/>
            )
          })}
        </View>

    </ScrollView>
  )
}
