import { View, Text, StyleSheet } from 'react-native';

export default function Card({ item }) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000'
    },
    cardText: {
        fontSize: 18,
    },
});