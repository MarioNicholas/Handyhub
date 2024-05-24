import * as React from 'react';
import { IconButton, Menu, PaperProvider, Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { useRouter } from 'expo-router'; // Ubah 'router' menjadi 'useRouter'
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [token, setToken] = React.useState<string | null>(null);
    const [userId, setUserId] = React.useState<string | null>(null);
    const [isAuth, setIsAuth] = React.useState<boolean>(false);
=======

export default function Navbar() {
    const [searchQuery, setSearchQuery] = React.useState('');
>>>>>>> f6257f3a854b304c02a9a52b177857a0b230e58b
    // const [visible, setVisible] = React.useState(false);
    const router = useRouter(); // Ubah 'router' menjadi 'useRouter'

    // const openMenu = () => setVisible(true);
    // const closeMenu = () => setVisible(false);

<<<<<<< HEAD
    const tokenChecker = async () => {
        const token = await AsyncStorage.getItem("token");
        
        if (!token) {
            return;
            }
        
            const userId = await AsyncStorage.getItem("userId");
            setToken(token);
            setUserId(userId);
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
            console.log("crotz");
            
        };
        
    const navigateToAuth = () => {
        {isAuth ? logoutHandler() : router.push('Menu/login')}
    };

    

=======
    const navigateToLogin = () => {
        router.push('/login');
    };

>>>>>>> f6257f3a854b304c02a9a52b177857a0b230e58b
    return (
        // <View style={{ flex: 1, backgroundColor: "red", maxHeight: 103 }}>
            // <PaperProvider>
                <View style={{
                    backgroundColor: '#027361',
<<<<<<< HEAD
=======
                    marginTop: 40,
>>>>>>> f6257f3a854b304c02a9a52b177857a0b230e58b
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
<<<<<<< HEAD
                        {isAuth ? <IconButton
                            icon="logout"
                            iconColor="red"
                            size={26}
                            onPress={navigateToAuth}
                        />
                        : 
=======
>>>>>>> f6257f3a854b304c02a9a52b177857a0b230e58b
                        <IconButton
                            icon="login"
                            iconColor="white"
                            size={26}
<<<<<<< HEAD
                            onPress={navigateToAuth}
                        />
                        }
=======
                            onPress={navigateToLogin}
                        />
>>>>>>> f6257f3a854b304c02a9a52b177857a0b230e58b
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
