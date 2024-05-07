// StudentOverviewScreen.js
import React, { useState, useLayoutEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { CATEGORIES } from "../data/dummy-data";

function StudentOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  // Find the student data
  const studentIndex = CATEGORIES.findIndex(
    (category) => category.id === catId
  );
  const student = CATEGORIES[studentIndex];

  // Calculate average grade
  const totalGrades = student.projects.reduce(
    (acc, project) => acc + project.grade,
    0
  );
  const averageGrade = student.projects.length
    ? totalGrades / student.projects.length
    : 0;

  // State management for modal and grade editing
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [updatedGrade, setUpdatedGrade] = useState("");

  // Set up chat button in navigation
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() =>
            navigation.navigate("ChatDetail", { title: student.title })
          }
        >
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, student]);

  // Open modal with selected project
  const openEditModal = (project) => {
    setSelectedProject(project);
    setUpdatedGrade(String(project.grade));
    setModalVisible(true);
  };

  // Update project grade
  const updateGrade = () => {
    const updatedProjects = student.projects.map((project) =>
      project.name === selectedProject.name
        ? { ...project, grade: Number(updatedGrade) }
        : project
    );

    // Update the CATEGORIES data
    CATEGORIES[studentIndex].projects = updatedProjects;

    // Close modal
    setModalVisible(false);
  };

  // Render each project with an edit button
  const renderProjectItem = ({ item }) => (
    <View style={styles.projectContainer}>
      <Text style={styles.projectTitle}>{item.name}</Text>
      <Text style={styles.projectGrade}>Grade: {item.grade}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => openEditModal(item)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.studentTitle}>
        {student.title} (Average Grade: {averageGrade.toFixed(2)})
      </Text>
      <FlatList
        data={student.projects}
        keyExtractor={(item) => item.name}
        renderItem={renderProjectItem}
      />

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit {selectedProject?.name}</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={updatedGrade}
              onChangeText={setUpdatedGrade}
            />
            <Button title="Save" onPress={updateGrade} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default StudentOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  studentTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  projectContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  projectGrade: {
    fontSize: 16,
    color: "#888",
  },
  editButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalInput: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 20,
    width: "80%",
  },
  chatButton: {
    marginRight: 10,
    padding: 8,
    backgroundColor: "#808080",
    borderRadius: 8,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});
