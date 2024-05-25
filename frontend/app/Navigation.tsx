import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import Favourites from "@/app/TabScreen/favourites";
import History from "@/app/TabScreen/history";
import Profile from "@/app/TabScreen/profile";
import Navbar from "@/components/navigation/Navbar";
import Home from "./TabScreen/home";
import Apply from "./Menu/apply";
import Login from "./Menu/login";
import Register from "./Menu/register";
import Registered from "./Menu/registered";
import Gardening from "./Menu/gardening";
import Electronics from "./Menu/electronics";
import Confirmed from "./Menu/confirmed";
import Detail from "./Menu/detail";

const Tab = createBottomTabNavigator();
const MenuStack = createNativeStackNavigator();

function MenuStackGroup() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <MenuStack.Screen name="Login" component={Login} />
      <MenuStack.Screen name="Register" component={Register} />
      <MenuStack.Screen name="Registered" component={Registered} />
      <MenuStack.Screen name="Electronics" component={Electronics} />
      <MenuStack.Screen name="Gardening" component={Gardening} />
      <MenuStack.Screen name="Detail" component={Detail} />
      <MenuStack.Screen name="Confirmed" component={Confirmed} />
      <MenuStack.Screen name="Apply" component={Apply} />
    </MenuStack.Navigator>
  );
}

function TabGroup() {
  return (
    <>
      <Navbar />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: "#bcbcbc",
          headerShown: false,
          tabBarStyle: { backgroundColor: "#027361" }
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={MenuStackGroup}
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={Favourites}
          options={{
            title: 'Favourites',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="heart" color={color} />,
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            title: 'History',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="history" color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="user" color={color} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default function Navigation() {
  return (
    <>
      <TabGroup />
    </>
  );
}
