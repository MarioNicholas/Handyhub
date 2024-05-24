import { Link } from "expo-router";
import { View, Image, ScrollView } from "react-native";
import * as React from "react";
import { Text } from "react-native-paper";
import Card from "@/components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const Hero = require("@/assets/images/banner.png");
  const FeaturedPlaceholder = require("@/assets/images/featured-placeholder.png");
  const electronics = require("@/assets/images/electronics.png");
  const plumbing = require("@/assets/images/plumbing.png");
  const cleaning = require("@/assets/images/cleaning.png");
  const renovation = require("@/assets/images/renovation.png");
  const gardening = require("@/assets/images/gardening.png");
  const relocation = require("@/assets/images/relocation.png");
  const others = require("@/assets/images/others.png");
  const apply = require("@/assets/images/apply.png");

  const [token, setToken] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [isAuth, setIsAuth] = React.useState<boolean>(false);

  const services = [
    { name: "Electronics", src: electronics },
    { name: "Plumbing", src: plumbing },
    { name: "Cleaning", src: cleaning },
    { name: "Renovation", src: renovation },
    { name: "Gardening", src: gardening },
    { name: "Relocation", src: relocation },
    { name: "Others", src: others },
    { name: "Apply", src: apply }
  ];

  const tokenChecker = async () => {
    const token = await AsyncStorage.getItem("token");
    const expiryDate = await AsyncStorage.getItem("expiryDate");

    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const userId = await AsyncStorage.getItem("userId");
    const remainingMiliSeconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setToken(token);
    setUserId(userId);
    setAutoLogout(remainingMiliSeconds);
    setIsAuth(true);
  };

  React.useEffect(() => {
    tokenChecker();
  }, []);

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("expiryDate");
    setToken(null);
    setUserId(null);
    setIsAuth(false);
  };

  const setAutoLogout = (millisecond: number) => {
    setTimeout(() => {
      logoutHandler();
    }, millisecond);
  };

  return (
    <ScrollView
      style={{
        paddingHorizontal: 30,
        flexGrow: 1,
      }}
    >
      <Text
        variant="headlineLarge"
        style={{ fontWeight: "bold", marginTop: 20, marginBottom: 10 }}
      >
        Welcome!
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Image source={Hero} style={{ width: 330, height: 170 }} />
      </View>
      <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Services</Text>
      
      <View style={{
        display:'flex',
        flex: 4,
        justifyContent: "center",
        flexDirection: 'row',
        marginHorizontal: "auto",
        width: "100%",
        flexWrap: "wrap",
      }}>
      <View style={{
        margin: 8, 
        display: "flex", 
        flex: 4, 
        flexDirection: "row", 
        flexWrap: "wrap", 
        width: "100%", 
        justifyContent: "space-between"}}>
        {services.map((service)=> {
          return (
            <Link href={service.name.toLowerCase()} key={service.name}>
              <View style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 2,
                overflow: "visible",
                width: 70,
                height: 80,
              }}>
                  <Image source={service.src} style={{
                    
                  }}/>
                  <Text variant="labelMedium" style={{
                    fontWeight: "bold",
                  }}>{service.name}</Text>
              </View>
            </Link>
          )
        })}
        </View>
      </View>
      
      <View style={{
        marginBottom: 20
      }}>
      <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Featured</Text>
        <Card name="Alan Smith" image={FeaturedPlaceholder} role="Hedge Specialist" rating={4.9} jobs={120} price={120000}/>      
      </View>
    </ScrollView>
  );
}
