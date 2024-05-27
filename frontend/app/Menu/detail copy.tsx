// import React from 'react'
// import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
// import { Text, Button, Avatar, Card, IconButton } from 'react-native-paper';
// import Swiper from 'react-native-swiper';
// import { RouteProp, useRoute } from '@react-navigation/native';

// const { width: screenWidth } = Dimensions.get('window');
// type RouteParams = {
//   id: string;
// };
// const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
// const { id } = route.params;
// export default function Detail() {
//   interface CarouselItem {
//     title: string;
//     uri: string;
//   }
  

//   const DetailPlaceholder = require("@/assets/images/Bob.png")
//   const entries: CarouselItem[] = [
//     { title: 'Image 1', uri: DetailPlaceholder },
//     { title: 'Image 2', uri: DetailPlaceholder },
//     { title: 'Image 3', uri: DetailPlaceholder },
//     { title: 'Image 4', uri: DetailPlaceholder },
//   ];
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <IconButton icon="arrow-left" size={24} onPress={() => {}} />
//         <View style={styles.headerRightIcons}>
//           <IconButton icon="email" size={24} onPress={() => {}} />
//           <IconButton icon="menu" size={24} onPress={() => {}} />
//         </View>
//       </View>
//       <Swiper
//         style={styles.wrapper}
//         showsButtons
//         autoplay
//         loop
//       >
//         {entries.map((item, index) => (
//           <View key={index} style={styles.carouselItem}>
//             <Image src={item.uri} style={styles.carouselImage} />
//             <Text style={styles.carouselTitle}>{item.title}</Text>
//           </View>
//         ))}
//       </Swiper>
//       <View style={styles.profileSection}>
//         <Text style={styles.profileName}>Bob</Text>
//         <Text style={styles.profileDetails}>Category: Renovation</Text>
//         <Text style={styles.profileDetails}>Job: Builder</Text>
//         <Text style={styles.profileDetails}>Rate: Rp 500.000/Hour</Text>
//         <Text style={styles.profileDescription}>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet risus at feugiat euismod.
//         </Text>
//       </View>
//       <View style={styles.reviewSection}>
//         <Text style={styles.reviewTitle}>Reviews:</Text>
//         <Text style={styles.viewAllText}>View All</Text>
//         <Card style={styles.reviewCard}>
//           <Card.Title
//             title="Ivan Leovandi"
//             subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet risus at feugiat euismod."
//             left={(props) => <Avatar.Icon {...props} icon="star" />}
//           />
//         </Card>
//         <Card style={styles.reviewCard}>
//           <Card.Title
//             title="Mario Nicholas"
//             subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet risus at feugiat euismod."
//             left={(props) => <Avatar.Icon {...props} icon="star" />}
//           />
//         </Card>
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button mode="contained" style={styles.chatButton} onPress={() => {}}>Chat</Button>
//         <Button mode="contained" style={styles.bookButton} onPress={() => {}}>Book</Button>
//       </View>
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerRightIcons: {
//     flexDirection: 'row',
//   },
//   wrapper: {
//     height: 400,
//   },
//   carouselItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   carouselImage: {
//     width: screenWidth * 0.8,
//     height: 400,
//     objectFit: "contain"
//   },
//   carouselTitle: {
//     marginTop: 8,
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   profileSection: {
//     marginVertical: 16,
//   },
//   profileName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   profileDetails: {
//     fontSize: 16,
//     marginVertical: 2,
//   },
//   profileDescription: {
//     fontSize: 16,
//     marginVertical: 8,
//   },
//   reviewSection: {
//     marginVertical: 16,
//   },
//   reviewTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   viewAllText: {
//     fontSize: 16,
//     color: '#0000FF',
//     alignSelf: 'flex-end',
//     marginVertical: 4,
//   },
//   reviewCard: {
//     marginVertical: 8,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 16,
//   },
//   chatButton: {
//     flex: 1,
//     marginRight: 8,
//     backgroundColor: '#00b894',
//   },
//   bookButton: {
//     flex: 1,
//     marginLeft: 8,
//     backgroundColor: '#00b894',
//   },
//   bottomNavigation: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//   },
// });
