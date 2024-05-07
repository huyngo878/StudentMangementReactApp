import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function UploadImageScreen() {
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraRollStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraRollStatus !== "granted" || cameraStatus !== "granted") {
        alert(
          "Sorry, we need camera and gallery permissions to make this work!"
        );
      }
    })();
  }, []);

  const saveImage = async (uri) => {
    const filename = uri.split("/").pop();
    const newPath = FileSystem.documentDirectory + filename;
    try {
      await FileSystem.moveAsync({
        from: uri,
        to: newPath,
      });
      return newPath;
    } catch (e) {
      console.error("Error saving image", e);
      alert("Failed to save the image.");
      return uri;
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets) {
      const savedUri = await saveImage(result.assets[0].uri);
      setImages((prevImages) => [...prevImages, savedUri]);
    }
  };

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets) {
      const savedUri = await saveImage(result.assets[0].uri);
      setImages((prevImages) => [...prevImages, savedUri]);
    }
  };

  const viewImage = (uri) => {
    console.log("Selected Image URI:", uri); // Add this line to log the URI
    setSelectedImage(uri);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => viewImage(item)}>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
        )}
        numColumns={4}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Button
        title="Pick an image from camera roll"
        onPress={handlePickImage}
      />
      <Button title="Take a photo" onPress={handleTakePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 80,
    height: 80,
    margin: 5,
  },
  fullImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
