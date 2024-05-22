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
    { name: "electronics", src: electronics },
    { name: "plumbing", src: plumbing },
    { name: "cleaning", src: cleaning },
    { name: "renovation", src: renovation },
    { name: "gardening", src: gardening },
    { name: "relocation", src: relocation },
    { name: "others", src: others },
    { name: "apply", src: apply },
  ];

  interface loginData {
    username: string;
    password: string;
  }

  interface signupData {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    username: string;
    password: string;
  }

  const tokenChecker = async () => {
    const token = await AsyncStorage.getItem("token");
    const expiryDate = await AsyncStorage.getItem("expiryDate");

    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      //logout
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

  const loginHandler = async (authData: loginData) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: authData.username,
          password: authData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 422) {
        throw new Error();
      }

      if (response.status !== 200 && response.status !== 201) {
        throw new Error();
      }

      const result = await response.json();
      setToken(result.token);
      setUserId(result.userId);
      await AsyncStorage.setItem("token", result.token);
      await AsyncStorage.setItem("userId", result.userId);
      const remainingMilisecond = 60 * 60 * 1000;
      const expiryDate = new Date().getTime() + remainingMilisecond;
      await AsyncStorage.setItem("expiryDate", expiryDate.toString());
      setAutoLogout(remainingMilisecond);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  const signupHandler = async (authData: signupData) => {
    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "PUT",
        body: JSON.stringify({
          email: authData.email,
          name: authData.name,
          phoneNumber: authData.phoneNumber,
          address: authData.address,
          username: authData.username,
          password: authData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 422) {
        throw new Error();
      }

      if (response.status !== 200 && response.status !== 201) {
        throw new Error();
      }

      const result = await response.json();
      setIsAuth(false);
    } catch (error) {
      console.log(error);
    }
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
      <Text
        variant="headlineLarge"
        style={{ fontWeight: "bold", marginTop: 20, marginBottom: 10 }}
      >
        Services
      </Text>

      <View
        style={{
          display: "flex",
          flex: 4,
          justifyContent: "center",
          flexDirection: "row",
          marginHorizontal: "auto",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {services.map((service) => {
          return (
            <View key={service.name} style={{ margin: 8 }}>
              <Image source={service.src} style={{ width: 62, height: 69 }} />
            </View>
          );
        })}
      </View>

      <Text
        variant="headlineLarge"
        style={{ fontWeight: "bold", marginTop: 20, marginBottom: 10 }}
      >
        Featured
      </Text>
      <Card
        name="Alan Smith"
        image={FeaturedPlaceholder}
        role="Hedge Specialist"
        rating={4.9}
        jobs={120}
        price={120000}
      />

      <Link href={"/login"}>Login</Link>
    </ScrollView>
  );
}
