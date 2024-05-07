// ChatDetailScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const ChatDetailScreen = ({ route }) => {
  const { title } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim().length > 0) {
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: Date.now().toString(), text: message },
      ]);
      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageBox}>
            <Text>{item.text}</Text>
          </View>
        )}
        style={styles.list}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    flex: 1,
  },
  messageBox: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#92bbff",
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
});

export default ChatDetailScreen;
