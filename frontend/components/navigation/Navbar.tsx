import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <View style={{
            backgroundColor: '#027361'
        }}>
            <Searchbar
            mode="view"
            placeholder="Search"
            
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{
                width: '60%',
                height: 40,
                marginVertical: 12,
                marginHorizontal: 24,
                backgroundColor: "#ffffff",
            }}
            inputStyle={{
                fontSize: 12,
                paddingBottom: 30
            }}
            />
        </View>
    )
}
