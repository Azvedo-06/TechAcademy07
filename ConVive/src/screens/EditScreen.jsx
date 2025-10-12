import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import {
  updateEvent,
  updateAtividades,
  updateEspacos,
  updateInformativos,
} from "../data/api";

export default function EditarItemScreen({ route, navigation }) {
  const { item, tipo } = route.params;
  // criar o resto aqui pra baixo
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [imagem, setImagem] = useState("");
  const [localizacao, setLocalazacao] = useState("");
  const [descricaoCard, setDescricaoCard] = useState("");
  const [descricaoModal, setDescricaoModal] = useState("");

  // criar o resto aqui pra baixo
  useEffect(() => {
    if (item) {
      setTitulo(item.title || "");
      setData(item.date || "");
      setImagem(item.image || "");
      setLocalazacao(item.local || "");
      setDescricaoCard(item.descriptionCard || "");
      setDescricaoModal(item.descriptionModal || "");
    }
  }, [item]);

  const handleSave = async () => {
    const dadosAtualizados = {
      title: titulo,
      date: data,
      image: imagem,
      local: localizacao,
      descriptionCard: descricaoCard,
      descriptionModal: descricaoModal,
    };

    try {
      switch (tipo) {
        case "eventos":
          await updateEvent(item.id, dadosAtualizados);
          break;
        case "espacos":
          await updateEspacos(item.id, dadosAtualizados);
          break;
        case "informativos":
          await updateInformativos(item.id, dadosAtualizados);
          break;
        case "atividades":
          await updateAtividades(item.id, dadosAtualizados);
          break;
      }

      Alert.alert("Sucesso", "Item atualizado!");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Erro: ", err.message)
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Título"
      />
      {(item?.date || item.date === "") && (
        <TextInput
          style={styles.input}
          value={data}
          onChangeText={setData}
          placeholder="Data"
        />
      )}
      {(item?.image || item.image === "") && (
        <TextInput
          style={styles.input}
          value={imagem}
          onChangeText={setImagem}
          placeholder="Imagem"
        />
      )}
      {(item?.local || item.local === "") && (
        <TextInput
          style={styles.input}
          value={localizacao}
          onChangeText={setLocalazacao}
          placeholder="Local"
        />
      )}
      {(item?.descriptionCard || item.descriptionCard === "") && (
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={descricaoCard}
          onChangeText={setDescricaoCard}
          placeholder="Descrição"
          multiline
          scrollEnabled={true}
        />
      )}
      {(item?.descriptionModal || item.descriptionModal === "") && (
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={descricaoModal}
          onChangeText={setDescricaoModal}
          placeholder="Descrição no Modal"
          multiline
          scrollEnabled={true}
        />
      )}
      <Button title="Salvar alterações" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
