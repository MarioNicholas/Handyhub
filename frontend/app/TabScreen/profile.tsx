import React, { useState } from 'react'
import { Button, Text } from 'react-native-paper';
import { View, Image, ScrollView } from "react-native";
import AddressCard from '@/components/AddressCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Login from '../Menu/login';

interface userProfile {
  username: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
}

export default function Profile() {
  const avatar = require("@/assets/images/Bob.png");
  const [loading, setLoading] = useState(true);
  const [user,setUser] = React.useState<userProfile>({
    username:"",name:"",phoneNumber:"",email:"",address:"",
  });
  const navigation = useNavigation()

  async function getProfile() {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login" as never);
    }
    
    const response = await fetch("http://192.168.1.13:8000/profile", {
        headers: {
          Authorization : `Bearer ${token}`,
        },
    });
    const result = await response.json();
    setUser(result.user);
    setLoading(false)
  }

  console.log(user);


  React.useEffect(() => {
    getProfile();
  }, [])

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
  if(!loading && user) {
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
          <Text variant='displaySmall' style={{
            color: "#027361",
            fontWeight: "bold",
            marginVertical: 4,
          }}>{user.username}</Text>
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
            }}>{user.name}</Text>

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
            }}>{user.phoneNumber}</Text>

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
            }}>{user.email}</Text>

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
  } else {
    <Text>Loading...</Text>
  }
}