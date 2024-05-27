import React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, Avatar, Card, IconButton } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { RouteProp, useRoute } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

interface CarouselItem {
  title: string;
  uri: string;
}

// type RouteParams = {
//   id: string;
// };

const service = {
  "_id": "66438177872a3648d53916eb",
  "name": "Bob Wall Fixing",
  "price": 200000,
  "description": "Bob will fix any broken wall in your house",
  "city": "Jakarta",
  "provider": {
  "favorite": [],
  "_id": "664b2534cfc1fb0d00dd0625",
  "name": "Mario",
  "username": "mariomario",
  "email": "mario@mario.com",
  "password": "$2b$12$xEqOhrE2ConjS7zZJ9ZuDOkS.kxbZV8zk08DiJqzd6OWAPjy06fdi",
  "phoneNumber": "0812345678",
  "address": "holis",
  "__v": 0
  },
  "category": {
  "_id": "664358e294657d8cc06c311b",
  "name": "Renovation",
  "description": "Renovation services involve improving or updating existing structures, either through repairs, replacements, or new constructions. Professionals in this category help transform spaces to meet customer needs and preferences."
  },
  "specialty": "Builder",
  "jobs": 81
  }

const DetailPlaceholder = require("@/assets/images/Bob.png")

const Detail = () => {
  const entries: CarouselItem[] = [
    { title: 'Image 1', uri: DetailPlaceholder },
    { title: 'Image 2', uri: DetailPlaceholder },
    { title: 'Image 3', uri: DetailPlaceholder },
    { title: 'Image 4', uri: DetailPlaceholder },
  ];
  
  // const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  // const { id } = route.params;
  const navigation : any = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons
        autoplay
        loop
      >
        {entries.map((item, index) => (
          <View key={index} style={styles.carouselItem}>
            <Image source={DetailPlaceholder} style={styles.carouselImage} />
            <Text style={styles.carouselTitle}>{item.title}</Text>
          </View>
        ))}
      </Swiper>
      <View style={styles.profileSection}>
        <Text style={styles.profileName}>{service.name}</Text>
        <Text style={styles.profileDetails}>Category: {service.category.name} </Text>
        <Text style={styles.profileDetails}>Job: {service.specialty}</Text>
        <Text style={styles.profileDetails}>Rate: {service.price}</Text>
        <Text style={styles.profileDescription}>
          {service.description}
        </Text>
      </View>
      {/* <View style={styles.reviewSection}>
        <Text style={styles.reviewTitle}>Reviews:</Text>
        <Text style={styles.viewAllText}>View All</Text>
        <Card style={styles.reviewCard}>
          <Card.Title
            title="Ivan Leovandi"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet risus at feugiat euismod."
            left={(props) => <Avatar.Icon {...props} icon="star" />}
          />
        </Card>
        <Card style={styles.reviewCard}>
          <Card.Title
            title="Mario Nicholas"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet risus at feugiat euismod."
            left={(props) => <Avatar.Icon {...props} icon="star" />}
          />
        </Card>
      </View> */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.chatButton} onPress={() => {}}>Chat</Button>
        <Button mode="contained" style={styles.bookButton} onPress={() => {
          navigation.push("Order", {params:service})
        }}>Book</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRightIcons: {
    flexDirection: 'row',
  },
  wrapper: {
    height: 400,
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: screenWidth * 0.8,
    height: 400,
    objectFit: "contain"
  },
  carouselTitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  profileSection: {
    marginVertical: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileDetails: {
    fontSize: 16,
    marginVertical: 2,
  },
  profileDescription: {
    fontSize: 16,
    marginVertical: 8,
  },
  reviewSection: {
    marginVertical: 16,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 16,
    color: '#0000FF',
    alignSelf: 'flex-end',
    marginVertical: 4,
  },
  reviewCard: {
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  chatButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#027361',
  },
  bookButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#027361',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default Detail;
