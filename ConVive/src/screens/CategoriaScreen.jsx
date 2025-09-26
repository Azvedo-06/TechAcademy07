import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet,
RefreshControl} from "react-native";
import Card from "../components/Card";
import ModalCard from "../components/Modal";
import BotaoCriarEvento from "../components/CreateEvent";

export default function CategoriaScreen({ route }) {
  const { categoria } = route.params; // categoria enviada do HomeScreen
  const dados = categoria.items || []; // pega os itens do mock

  // estados para o modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // estado para os itens exibidos
  const [items, setItems] = useState(dados);
  const [loading, setLoading] = useState(false);

  // estados para o modal
  const handleItemPress = (item) => {
  setSelectedItem(item); 
  setModalVisible(true);
  }

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
        data={dados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Card item={item} onPress={() => handleItemPress(item)} />}
        
        
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
      <BotaoCriarEvento/>
      <ModalCard 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedItem={selectedItem}
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
