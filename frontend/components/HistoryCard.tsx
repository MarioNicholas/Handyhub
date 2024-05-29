import { Link } from "expo-router";
import { View, Image } from "react-native";
import * as React from 'react';
import { Text } from 'react-native-paper'

export default function HistoryCard({props}: any) {
    
    const oldDate = new Date(props.date).toLocaleString("en-us", {dateStyle:"long"})
    // const year = oldDate.getFullYear()
    // const month = oldDate.getMonth()
    // const date = oldDate.getDate()

    // const newDate = `${date} ${month} ${year} `
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            borderColor:"#027361",
            borderRadius:10,
        }}>
            <Image source={props?.image} style={{width: 120, height: 120}}/>
            <View style={{
            
            }}>
            <View style={{paddingRight: 12, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center"}}>
                <Text variant="titleMedium" style={{fontWeight: 'bold', marginTop: 8, marginHorizontal: 12}}>{props.providerName}</Text>
                {props.status === "Scheduled" ? 
                <Text variant="titleMedium" style={{fontWeight: "bold", color: `#E8451E`}}>{props.status}</Text>
                : 
                <Text variant="titleMedium" style={{fontWeight: "bold", color: `#027361`}}>{props.status}</Text>
            }
            </View>
            <Text variant="titleSmall" style={{fontWeight: "200", marginHorizontal: 12}}>{oldDate}</Text>
            <Text variant="labelSmall" style={{fontWeight: "200", marginHorizontal: 12, marginTop: 16}}>Rating: <Text variant="labelSmall" style={{fontWeight: "bold"}}>{props.rating}</Text></Text>
            <Text variant="labelSmall" style={{fontWeight: "200", marginHorizontal: 12, marginTop: 2}}>Price: <Text variant="labelSmall" style={{fontWeight: "bold"}}>Rp {props.amount}</Text></Text>
            </View>
        </View>
    )
}
