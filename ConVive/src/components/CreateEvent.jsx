import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BotaoCriarEvento({ onPress }) {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={
        () => navigation.navigate("Criar")
      }>
        <Text style={styles.text}>+ Criar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 30,
  },
  button: {
    backgroundColor: "#28a745", // verde para diferenciar
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 3, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
