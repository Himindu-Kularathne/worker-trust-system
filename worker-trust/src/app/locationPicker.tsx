import MapView, { Marker } from "react-native-maps";
import { View, Button } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function LocationPicker() {
  const [coord, setCoord] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
  });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...coord,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(e) => setCoord(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={coord} />
      </MapView>

      <Button
        title="Confirm Location"
        onPress={() =>
          router.push({
            pathname: "/register",
            params: {
              lat: coord.latitude,
              lng: coord.longitude,
            },
          })
        }
      />
    </View>
  );
}
