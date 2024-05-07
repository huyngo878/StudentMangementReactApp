import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios"; // Ensure axios is installed

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      console.log("Fetching location data from API...");
      const response = await axios.get(
        "https://urchin-app-wyimv.ondigitalocean.app/api/v0/players/locations"
      );
      console.log("API response:", response);

      const { locations } = response.data.data;
      console.log("Parsed locations data:", locations);

      const formattedLocations = locations.map((loc) => ({
        ...loc,
        latitude: loc.latitude,
        longitude: loc.longitude,
        title: loc.playerName,
        id: loc._id,
      }));
      console.log("Formatted locations for markers:", formattedLocations);

      setMarkers(formattedLocations);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert(
        "Error fetching data",
        "Could not fetch location data from the server"
      );
    }
  };

  const handleLocateUser = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "You need to grant location permissions to use this feature."
      );
      return;
    }

    console.log("Requesting current user location...");
    const userLocation = await Location.getCurrentPositionAsync({});
    console.log("User location obtained:", userLocation);

    const location = {
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setCurrentLocation(location);

    const newMarker = {
      id: new Date().toISOString(),
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      timestamp: new Date().toISOString(),
      title: "My Location",
    };

    console.log("Adding new marker for current location:", newMarker);
    setMarkers((prev) => [...prev, newMarker]);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 31.9686,
          longitude: -99.9018,
          latitudeDelta: 7,
          longitudeDelta: 7,
        }}
        region={currentLocation}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          >
            <Callout>
              <Text>{marker.title}</Text>
              <Text>Latitude: {marker.latitude}</Text>
              <Text>Longitude: {marker.longitude}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleLocateUser}
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
