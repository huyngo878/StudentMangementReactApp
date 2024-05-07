import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const DUMMY_DATA = [
  { id: "1", title: "Chat with Alice" },
  { id: "2", title: "Chat with Bob" },
  { id: "3", title: "Chat with Charlie" },
];

function ChatScreen() {
  const navigation = useNavigation(); // Initialize the navigation hook

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate("ChatDetail", {
                chatId: item.id,
                title: item.title,
              })
            }
          >
            <Text style={styles.chatTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  chatItem: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#FFFF",
    borderRadius: 10,
    alignItems: "center",
  },
  chatTitle: {
    fontSize: 18,
  },
});

export default ChatScreen;
