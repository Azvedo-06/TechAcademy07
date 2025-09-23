import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

export default function ModalCard({
  modalVisible,
  setModalVisible,
  selectedItem,
}) {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            {selectedItem && (
              <>
                {selectedItem.imagem ? (
                  <Image
                    source={
                      typeof selectedItem.imagem === "string"
                        ? { uri: selectedItem.imagem }
                        : selectedItem.imagem
                    }
                    style={styles.modalImage}
                  />
                ) : null}
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                {selectedItem.descriptionModal ? <Text style={styles.modalDescription}>{selectedItem.descriptionModal}</Text> : null}
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "blue", marginTop: 20 }}>Fechar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    maxHeight: "80%",
  },
  modalImage: {
    width: "100%",
    height: 200,
    resizeMode: "stretch",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: "#333",
  },
});
