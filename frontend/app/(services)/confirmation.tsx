import { useRouter } from 'expo-router'
import React from 'react'
import { View, Image } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function confirmation(title : string, message : string, redirectMessage : string, redirectHref : string) {
    const confirmImage = require("@/assets/images/confirmation.png")
    const router = useRouter()
    const navigate = () => {
        router.push(`${redirectHref}`);
    };
    return (
    <View>
        <Text>Halo</Text>
        {/* <Text>
            {title}
        </Text>
        <Image source={confirmImage} />
        <Text>{message}</Text>
        <Button onPress={navigate}>
            <Text>
                {redirectMessage}
            </Text>
        </Button> */}
    </View>
    )
}
