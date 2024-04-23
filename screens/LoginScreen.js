import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://urchin-app-wyimv.ondigitalocean.app/api/v0/players/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        console.log("Login successful", json);
        setIsModalVisible(false);
        navigation.navigate("Categories");
      } else {
        console.error("Login failed", json);
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="none" // No animation
      transparent={true}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>LOGIN</Text>
          <TextInput
            style={styles.input}
            placeholder="Email or Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: 300, // Fixed width
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    width: "100%", // Full width of the modalView
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#000", // Black border color to match the uploaded image
    borderRadius: 5,
  },
  button: {
    width: "100%", // Full width of the modalView
    backgroundColor: "#000", // Black background for buttons
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default LoginScreen;
