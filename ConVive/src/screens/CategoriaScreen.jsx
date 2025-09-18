import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Items } from "../data/items";

export default function CategoriaScreen({ route }) {
  const { categoria } = route.params; // categoria enviada do HomeScreen
  const dados = Items[categoria.name]; // pega os itens do mock

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoria.name}</Text>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});