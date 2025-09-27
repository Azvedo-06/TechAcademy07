import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { createEvent } from "../data/api";

export default function CriarEventoScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [local, setLocal] = useState("");
  const [imagem, setImagem] = useState("");
  const [descriptionCard, setDescriptionCard] = useState("");
  const [descriptionModal, setDescriptionModal] = useState("");

  const handleSalvar = async () => {
    if (!name || !date) {
      Alert.alert("Atenção!", "Preencha todos os campos.");
      return;
    }

    try {
      const novoEvento = {
        title: name,
        date: date,
        imagem: imagem || '', 
        local: [{ espacos: local || "Local não informado" }], 
        descriptionCard: descriptionCard || "",
        descriptionModal: descriptionModal || "",
        isEvent: true,
      };

      await createEvent(novoEvento);

      if (route.params?.onCreate) {
        route.params.onCreate();
      }

      Alert.alert("Sucesso!", "Evento criado com sucesso.");
      navigation.goBack();
    } catch (Error) {
      Alert.alert(Error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Novo Evento</Text>

      <Text style={styles.label}>Nome do Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do evento"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Data</Text>
      <TextInput
        style={styles.input}
        placeholder="AAAA/MM/DD"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Local</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o local do evento"
        value={local}
        onChangeText={setLocal}
      />

      <Text style={styles.label}>URL da Imagem</Text>
      <TextInput
        style={styles.input}
        placeholder="https://exemplo.com/imagem.jpg"
        value={imagem}
        onChangeText={setImagem}
      />

      <Text style={styles.label}>Descrição curta</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição curta"
        value={descriptionCard}
        onChangeText={setDescriptionCard}
      />

      <Text style={styles.label}>Descrição completa</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descrição completa"
        value={descriptionModal}
        onChangeText={setDescriptionModal}
        multiline
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
