// app.js
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createNativeStackNavigator,
  HeaderTitle,
} from "@react-navigation/native-stack";
import CategoriesScreen from "./screens/CategoriesScreen";
import StudentOverviewScreen from "./screens/StudentOverviewScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MapScreen from "./screens/MapScreen";
import ChatScreen from "./screens/ChatScreen";
import ChatDetailScreen from "./screens/ChatDetailScreen";
import UploadImageScreen from "./screens/UploadImageScreen";
import LandingScreen from "./screens/LandingScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomHeaderTitle({ route }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: "#555" }}>{route.params.title}</Text>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Categories" component={CategoriesScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Upload Image" component={UploadImageScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Student Overview"
            component={StudentOverviewScreen}
            options={{ headerTitle: "Student Overview" }}
          />
          <Stack.Screen
            name="ChatDetail"
            component={ChatDetailScreen}
            options={({ route }) => ({
              headerTitle: () => <CustomHeaderTitle route={route} />,
              headerBackTitleVisible: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
