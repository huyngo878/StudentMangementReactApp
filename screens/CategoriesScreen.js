import React, { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../data/dummy-data";

function CategoriesScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const displayedCategories = CATEGORIES.filter(
    (category) =>
      (selectedClass ? category.classNumber === selectedClass : true) &&
      category.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const classes = [
    { label: "All Classes", value: "" },
    { label: "Class 1063", value: "1063" },
    { label: "Class 4483", value: "4483" },
    { label: "Class 4883", value: "4883" },
  ];

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("Student Overview", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  function selectClass(value) {
    setSelectedClass(value);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Students..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedClass || "Select Class"}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {classes.map((item, index) => (
            <Button
              key={index}
              title={item.label}
              onPress={() => selectClass(item.value)}
            />
          ))}
        </View>
      </Modal>

      {displayedCategories.length === 0 && <Text>No students found.</Text>}
      <FlatList
        data={displayedCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    margin: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
  },
  dropdownText: {
    fontSize: 16,
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
  // Add more styles as needed for your modal and buttons
});

export default CategoriesScreen;
