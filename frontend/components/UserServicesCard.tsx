import { Link } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import * as React from 'react';
import { Button, Dialog, PaperProvider, Portal, Text, TextInput } from 'react-native-paper'

export default function UserServicesCard({ props, token, showDialog }: any) {
    // const[image,setImage] = React.useState(require("@/assets/images/featured-placeholder.png"))
    // if(props.image){
    //     setImage(props.image)
    // }

    const deleteHandler = async() => {
        try {
            const response = await fetch(`http://192.168.1.13:8000/admin/delete-service/${props._id}`, {
                method: "DELETE", 
                headers: {Authorization : `Bearer ${token}`}
            });
            const result = await response.json();
            console.log(result)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: `http://192.168.1.13:8000/images/${props?.images[0]}` }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{props?.name}</Text>
                <Text style={styles.specialty}>{props?.specialty}</Text>
                <View style={styles.buttonContainer}>
                <Button onPress={() => showDialog(props)} buttonColor="#027361"><Text>Edit</Text></Button>
                <Button onPress={deleteHandler} buttonColor="red"><Text>Delete</Text></Button>
                </View>
            </View>
        </View>
        );
    }
    
const styles = StyleSheet.create({
    cardContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#027361",
    borderRadius: 10,
    marginBottom: 10,
    },
    image: {
    width: 120,
    height: 120,
    },
    infoContainer: {
    flex: 1,
    padding: 10,
    },
    title: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: "black"
    },
    specialty: {
    color: "#027361",
    fontWeight: 'bold',
    marginBottom: 8,
    },
    buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    },
});