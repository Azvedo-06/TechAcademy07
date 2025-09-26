import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function CriarEventoScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");

  const handleSalvar = () => {
    if (!nome || !data) {
      Alert.alert("Atenção!","Preencha todos os campos.");
      return;
    }

    // Aqui você pode salvar no backend, AsyncStorage, contexto etc.
    Alert.alert("Evento criado!",`\nNome: ${nome}\nData: ${data}`);

    // Se quiser voltar para a tela anterior:
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Novo Evento</Text>

      <Text style={styles.label}>Nome do Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do evento"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Data</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={data}
        onChangeText={setData}
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
