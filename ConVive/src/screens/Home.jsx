import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Mock } from "../data/Mock";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comunidade que se vive</Text>
      <FlatList
        data={Mock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Categoria", { categoria: item }) 
            }
          >
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableOpacity> 
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
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
    backgroundColor: "#66bb6ab6",
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});
