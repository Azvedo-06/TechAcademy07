import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export default function HomeScreen({navigation}) {
    const categorias = ['Entradas', 'Pratos Principais', 'Sobremesas', 'Bebidas'];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione a Categoria</Text>
            {categorias.map((categoria, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => navigation.navigate('Categoria', {categoria})}
                >
                    <Text style={styles.buttonText}>{categoria}</Text>
                </TouchableOpacity>
            ))}
        </View>
    ); 
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#e5e5e5',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
});
