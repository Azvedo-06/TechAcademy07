import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet,
RefreshControl} from "react-native";
import Card from "../components/Card";

export default function CategoriaScreen({ route }) {
  const { categoria } = route.params; // categoria enviada do HomeScreen
  const dados = categoria.items || []; // pega os itens do mock

  // estado para os itens exibidos
  const [items, setItems] = useState(dados);
  const [loading, setLoading] = useState(false);

  // função de refresh
  const reload = () => {
    setLoading(true);
    setTimeout(() => {
      setItems(dados);
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoria.name}</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Card item={item} />}
        ListEmptyComponent={
          <View style={{ alignItems: "center", padding: 24 }}>
            <Text>Nenhum produto cadastrado.</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reload} />
        }
        contentContainerStyle={items.length === 0 ? styles.listEmpty : styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
