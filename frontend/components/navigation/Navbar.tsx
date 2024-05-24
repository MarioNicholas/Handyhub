import * as React from 'react';
import { IconButton, Menu, PaperProvider, Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { useRouter } from 'expo-router'; // Ubah 'router' menjadi 'useRouter'

export default function Navbar() {
    const [searchQuery, setSearchQuery] = React.useState('');
    // const [visible, setVisible] = React.useState(false);
    const router = useRouter(); // Ubah 'router' menjadi 'useRouter'

    // const openMenu = () => setVisible(true);
    // const closeMenu = () => setVisible(false);

    const navigateToLogin = () => {
        router.push('/login');
    };

    return (
        // <View style={{ flex: 1, backgroundColor: "red", maxHeight: 103 }}>
            // <PaperProvider>
                <View style={{
                    backgroundColor: '#027361',
                    marginTop: 40,
                    marginBottom: 0,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
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
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}>
                        <IconButton
                            icon="email"
                            iconColor="white"
                            size={26}
                            onPress={() => console.log('Pressed')}
                        />
                        <IconButton
                            icon="login"
                            iconColor="white"
                            size={26}
                            onPress={navigateToLogin}
                        />
                        {/* <Menu
                            statusBarHeight={27}
                            visible={visible}
                            onDismiss={closeMenu}
                            style={{
                                zIndex: 100
                            }}
                            anchor={
                                <IconButton
                                    icon="menu"
                                    iconColor="white"
                                    size={26}
                                    onPress={openMenu}
                                />
                            }
                        >
                            <Menu.Item onPress={navigateToLogin} title="Login" />
                            <Menu.Item onPress={() => {}} title="Settings" />
                        </Menu> */}
                    </View>
                </View>
            // </PaperProvider>
        // </View>
    )
}
