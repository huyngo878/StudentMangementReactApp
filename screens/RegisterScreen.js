import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";

function RegisterScreen() {
  const [playerName, setPlayerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://urchin-app-wyimv.ondigitalocean.app/api/v0/players/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playerName: playerName,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
          }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        console.log("Registration successful", json);
        navigation.navigate("Student Categories");
      } else {
        console.error("Registration failed", json);
      }
    } catch (error) {
      console.error("An error occurred during registration", error);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide" // Slide up animation
      transparent={true}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>REGISTER</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={playerName}
            onChangeText={setPlayerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
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
    width: "100%",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#000",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default RegisterScreen;
