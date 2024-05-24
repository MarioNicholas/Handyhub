import { Link } from "expo-router";
import { View, Image } from "react-native";
import * as React from 'react';
import { Text } from 'react-native-paper'

<<<<<<< HEAD
export default function Card({props}: any) {
    // const[image,setImage] = React.useState(require("@/assets/images/featured-placeholder.png"))
    // if(props.image){
    //     setImage(props.image)
    // }
=======
export default function Card(props: any) {
>>>>>>> f6257f3a854b304c02a9a52b177857a0b230e58b
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            borderColor:"#027361",
            borderRadius:10
        }}>
<<<<<<< HEAD
            <Image source={props?.image} style={{width: 120, height: 120}}/>
            <View style={{
            
            }}>
            <Text variant="titleMedium" style={{fontWeight: 'bold', marginTop: 8, marginHorizontal: 12}}>{props?.name}</Text>
            <Text variant="titleSmall" style={{color: "#027361", fontWeight: 'bold',  marginHorizontal: 12}}>{props?.specialty}</Text>
=======
            <Image source={props.image} style={{width: 120, height: 120}}/>
            <View style={{
            
            }}>
            <Text variant="titleMedium" style={{fontWeight: 'bold', marginTop: 8, marginHorizontal: 12}}>{props.name}</Text>
            <Text variant="titleSmall" style={{color: "#027361", fontWeight: 'bold',  marginHorizontal: 12}}>{props.role}</Text>
>>>>>>> f6257f3a854b304c02a9a52b177857a0b230e58b
            <View style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <View>
                <Text variant="bodySmall" style={{ marginTop: 8, marginHorizontal: 12}}>Rating</Text>
<<<<<<< HEAD
                <Text variant="bodySmall" style={{ fontWeight: "bold", marginTop: 8, marginHorizontal: 12}}>{props?.rating}</Text>
                </View>
                <View>
                <Text variant="bodySmall" style={{ marginTop: 8, marginHorizontal: 12}}>Jobs</Text>
                <Text variant="bodySmall" style={{ fontWeight: "bold", marginTop: 8, marginHorizontal: 12}}>{props?.jobs}</Text>
                </View>
                <View>
                <Text variant="bodySmall" style={{ marginTop: 8, marginHorizontal: 12}}>Price</Text>
                <Text variant="bodySmall" style={{ fontWeight: "bold", marginTop: 8, marginHorizontal: 12}}>Rp{props?.price}</Text>
=======
                <Text variant="bodySmall" style={{ fontWeight: "bold", marginTop: 8, marginHorizontal: 12}}>{props.rating}</Text>
                </View>
                <View>
                <Text variant="bodySmall" style={{ marginTop: 8, marginHorizontal: 12}}>Jobs</Text>
                <Text variant="bodySmall" style={{ fontWeight: "bold", marginTop: 8, marginHorizontal: 12}}>{props.jobs}</Text>
                </View>
                <View>
                <Text variant="bodySmall" style={{ marginTop: 8, marginHorizontal: 12}}>Price</Text>
                <Text variant="bodySmall" style={{ fontWeight: "bold", marginTop: 8, marginHorizontal: 12}}>Rp{props.price}</Text>
>>>>>>> f6257f3a854b304c02a9a52b177857a0b230e58b
                </View>
            </View>
            </View>
        </View>
    )
}
