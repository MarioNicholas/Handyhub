import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const paymentMethods = [
    { id: 'bca', label: 'Transfer BCA', icon: require('@/assets/images/bca.png') },
    { id: 'qris', label: 'QRIS', icon: require('@/assets/images/qris.png') },
    { id: 'gopay', label: 'Gopay', icon: require('@/assets/images/gopay.png') },
    { id: 'shopeepay', label: 'Shopee Pay', icon: require('@/assets/images/shopeepay.png') },
    { id: 'ovo', label: 'OVO',icon: require('@/assets/images/ovo.png') },
    ];

    export default function Payment() {
    const [selectedMethod, setSelectedMethod] = useState('qris');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Payment Method</Text>
        <View style={styles.paymentSection}>
            {paymentMethods.map((method) => (
            <TouchableOpacity
                key={method.id}
                style={styles.paymentMethod}
                onPress={() => setSelectedMethod(method.id)}
            >
                <View style={styles.methodInfo}>
                <Image source={method.icon} style={styles.methodIcon} />
                <Text style={styles.methodLabel}>{method.label}</Text>
                </View>
                <View style={selectedMethod === method.id ? styles.radioSelected : styles.radio} />
            </TouchableOpacity>
            ))}
        </View>

        <View style={styles.paymentDetail}>
            <Text style={styles.header}>Payment Detail</Text>
            <View style={styles.detailRow}>
            <Text>Rate (x2)</Text>
            <Text>Rp 500.000/Hour</Text>
            </View>
            <View style={styles.detailRow}>
            <Text>Service Fee</Text>
            <Text>Rp 25.000</Text>
            </View>
            <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>Rp 1.025.000</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    paymentSection: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#000",
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    paymentMethod: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    methodInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    methodIcon: {
        width: 40,
        height: 40,
        marginRight: 16,
        objectFit: "contain",
    },
    methodLabel: {
        fontSize: 16,
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'black',
    },
    radioSelected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 6,
        borderColor: 'black',
    },
    paymentDetail: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    totalAmount: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: '#027361',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
