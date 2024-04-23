import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { CATEGORIES } from "../data/dummy-data";

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState(
    CATEGORIES.map((category) => ({
      latitude: category.latitude,
      longitude: category.longitude,
      title: category.title,
      description: `Timestamp: ${category.timestamp}`,
      id: category.id,
    }))
  ); // Initialize markers with student locations

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission not granted",
          "You need to grant location permissions to use this feature."
        );
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Add new location marker for the user with timestamp
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          title: "My Current Location",
          description: `Timestamp: ${new Date(
            userLocation.timestamp
          ).toISOString()}`,
          id: "userLocation", // A unique id for the user's location marker
        },
      ]);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={
          currentLocation || {
            latitude: 31.9686,
            longitude: -99.9018,
            latitudeDelta: 7,
            longitudeDelta: 7,
          }
        }
        showsUserLocation={true} // Optional: to show user's location with the default blue dot
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          >
            <Callout>
              <Text>{marker.title}</Text>
              <Text>{marker.description}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (currentLocation) {
            setCurrentLocation({
              ...currentLocation,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        }}
      >
        <Text style={styles.buttonText}>Locate Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  buttonText: {
    color: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
  },
});

export default MapScreen;
