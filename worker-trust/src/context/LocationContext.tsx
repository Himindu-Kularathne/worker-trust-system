import React, { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LocationCoords = {
  latitude: number;
  longitude: number;
};

interface LocationContextValue {
  locationOn: boolean;
  location: LocationCoords | null;
  setLocationOn: (value: boolean) => void;
}

export const LocationContext = createContext<LocationContextValue | undefined>(
  undefined
);

const STORAGE_KEYS = {
  ENABLED: "location_enabled",
  COORDS: "location_coords",
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locationOn, setLocationOnState] = useState(false);
  const [location, setLocation] = useState<LocationCoords | null>(null);

  /* ---------- Load saved preference ---------- */
  useEffect(() => {
    (async () => {
      const enabled = await AsyncStorage.getItem(STORAGE_KEYS.ENABLED);
      const coords = await AsyncStorage.getItem(STORAGE_KEYS.COORDS);

      if (enabled === "true") {
        setLocationOnState(true);
      }

      if (coords) {
        setLocation(JSON.parse(coords));
      }
    })();
  }, []);

  /* ---------- Handle toggle ---------- */
  const setLocationOn = async (value: boolean) => {
    setLocationOnState(value);
    await AsyncStorage.setItem(STORAGE_KEYS.ENABLED, String(value));

    if (!value) return;

    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setLocationOnState(false);
      await AsyncStorage.setItem(STORAGE_KEYS.ENABLED, "false");
      return;
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    setLocation(coords);
    await AsyncStorage.setItem(
      STORAGE_KEYS.COORDS,
      JSON.stringify(coords)
    );
  };

  return (
    <LocationContext.Provider
      value={{
        locationOn,
        location,
        setLocationOn,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};