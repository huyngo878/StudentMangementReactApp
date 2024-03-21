import { View, Pressable, Text, Image, StyleSheet } from "react-native";

function MealItem({ title, imageUrl }) {
  return (
    <View>
      <Pressable>
        {/* Corrected the View tag */}
        <View>
          <Image source={{ uri: imageUrl }} style={styles.image} />{" "}
          {/* Added style for image */}
        </View>
        {/* Corrected styles reference */}
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default MealItem;
