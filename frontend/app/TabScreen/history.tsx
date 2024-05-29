import HistoryCard from '@/components/HistoryCard';
import React from 'react'
import {Text} from "react-native-paper"
import { View, Image, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface History {
  service: {
    provider: {
      name:string
    }
  },
  serviceDate: Date,
  amount: number,
  status: string,
  rating: number
}

interface HistoryArray extends Array<History>{};


export default function History() {
  const[historyOrder, setHistoryOrder] = React.useState<HistoryArray>([]);
  const [loading, setLoading] = React.useState(true);

  const navigation = useNavigation()

  async function getHistory () {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login" as never)
    }
    
    const response = await fetch("http://192.168.1.13:8000/orders", {
      headers: {
        Authorization : `Bearer ${token}`,
      },
    });
    const result = await response.json();
    const history = result.orders.map((item: any) => {return {providerName : item.serviceId.provider.name, amount: item.amount, date: item.serviceDate, status: item.status, rating: 5}} )
    setHistoryOrder(history);
    setLoading(false)
  }

  React.useEffect(()=>{
    getHistory()
  }, [historyOrder])  

  return (
    <View>
      {!loading ? 
        <View style={{padding: 30}}>
          <Text variant="displayMedium" style={{fontWeight: "bold", marginBottom: 12}}>History</Text>
          {historyOrder.map((history) => (
            <Pressable style={{marginVertical: 6}}>
              <HistoryCard props={history}/>
            </Pressable>
          ))}
        </View>
      : 
        <Text>Loading...</Text>
      }
    </View>
  )
}
