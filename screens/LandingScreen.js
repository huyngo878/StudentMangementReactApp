import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function LandingScreen({ navigation }) {
  // Navigate to Home (Drawer) after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")} // Adjust the path to your logo file
        style={styles.logo}
      />
      <Text style={styles.title}>Student Management App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafeff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
