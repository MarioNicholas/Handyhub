import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '@/components/navigation/Navbar';


export default function TabLayout() {
  return (
    <>
      <Navbar />
      <Tabs screenOptions={{ 
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: "#bcbcbc", 
        headerShown : false, 
        tabBarStyle: {backgroundColor: "#027361"} 
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="favourites"
          options={{
            title: 'Favourites',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="heart" color={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="history" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="user" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
