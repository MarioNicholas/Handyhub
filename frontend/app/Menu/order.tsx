import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import { Text, Button, Card, IconButton } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const Order = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const OrderPlaceholder = require("@/assets/images/Bob.png")

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileSection}>
            <Image source={OrderPlaceholder} style={styles.profileImage} />
            <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>Bob</Text>
            <Text style={styles.profileDetail}>
                <Text style={styles.profileDetailLabel}>Category: </Text>Renovation
            </Text>
            <Text style={styles.profileDetail}>
                <Text style={styles.profileDetailLabel}>Job: </Text>Builder
            </Text>
            </View>
        </View>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Detail</Text>
            <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Button mode="text" onPress={() => setShowDatePicker(true)}>
                {date.toDateString()}
            </Button>
            {showDatePicker && (
                <DateTimePicker
                minimumDate={new Date()}
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
                />
            )}
            </View>
            <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Button mode="text" onPress={() => setShowTimePicker(true)}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Button>
            {showTimePicker && (
                <DateTimePicker
                value={time}
                minimumDate={new Date()}
                mode="time"
                display="default"
                onChange={onTimeChange}
                />
            )}
            </View>
            <Text style={styles.sectionSubtitle}>Address List</Text>
            <Card style={styles.addressCard}>
            <Card.Content>
                <Text style={styles.addressTitle}>Home</Text>
                <Text>0812345679</Text>
                <Text>Jalan Genteng No 123 RT 1 / RW 2, Kelurahan A, Kecamatan B, 40131, Bandung, Jawa Barat</Text>
            </Card.Content>
            </Card>
            <Card style={styles.addressCard}>
            <Card.Content>
                <Text style={styles.addressTitle}>Kos</Text>
                <Text>0812345679</Text>
                <Text>Jalan Genteng No 11 RT 1 / RW 2, Kelurahan A, Kecamatan B, 40131, Bandung, Jawa Barat</Text>
            </Card.Content>
            </Card>
        </View>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Detail</Text>
            <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rate (x2):</Text>
            <Text>Rp 500.000/Hour</Text>
            </View>
            <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service Fee:</Text>
            <Text>Rp 25.000</Text>
            </View>
            <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>Rp 1.025.000</Text>
            </View>
            <Button mode="contained" style={styles.paymentButton} onPress={() => {}}>
            Choose Payment Method
            </Button>
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
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 20,
    },
    profileTextContainer: {
        marginLeft: 16,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileDetail: {
        fontSize: 16,
    },
    profileDetailLabel: {
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontWeight: 'bold',
    },
    addressCard: {
        marginVertical: 8,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    totalLabel: {
        fontWeight: 'bold',
    },
    totalAmount: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    paymentButton: {
        marginTop: 16,
        backgroundColor: '#027361',
    },
});

export default Order;
