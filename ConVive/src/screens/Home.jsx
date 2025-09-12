import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Categories } from "../data/categories";

export default function HomeScreen({ navigation }) {
  const Options = ["Eventos", "Espaços", "Atividades"];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comunidade que se vive</Text>
      {Categories.map((categoria) => (
        <TouchableOpacity
          key={categoria.id}
          style={styles.button}
          onPress={() => navigation.navigate("Categoria", { categoria: categoria.name })}
        >
          <Text style={styles.buttonText}>{categoria.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e5e5e5",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});
