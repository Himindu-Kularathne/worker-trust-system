import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchFilters } from "../types/worker";
import { mapSriLankaLocation } from "@/src/utils/mapLocationToSriLanka";

type Action =
  | { type: "SET_CATEGORY"; payload?: string }
  | { type: "SET_PROVINCE"; payload?: string }
  | { type: "SET_DISTRICT"; payload?: string }
  | { type: "SET_CITY"; payload?: string }
  | { type: "RESET_LOCATION" }
  | { type: "RESET_ALL" };

const initialState: SearchFilters = {
  category: undefined,
  province: undefined,
  district: undefined,
  city: undefined,
};

function reducer(state: SearchFilters, action: Action): SearchFilters {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };

    case "SET_PROVINCE":
      return {
        ...state,
        province: action.payload,
        district: undefined,
        city: undefined,
      };

    case "SET_DISTRICT":
      return {
        ...state,
        district: action.payload,
        city: undefined,
      };

    case "SET_CITY":
      return {
        ...state,
        city: action.payload,
      };

    case "RESET_LOCATION":
      return {
        ...state,
        province: undefined,
        district: undefined,
        city: undefined,
      };

    case "RESET_ALL":
      return initialState;

    default:
      return state;
  }
}

interface ContextValue {
  state: SearchFilters;
  locationOn: boolean;
  setLocationOn: (value: boolean) => Promise<void>;
  setCategory: (category?: string) => void;
  setProvince: (province?: string) => void;
  setDistrict: (district?: string) => void;
  setCity: (city?: string) => void;
  resetLocation: () => void;
  resetAll: () => void;
  useCurrentLocation: () => Promise<void>;
}

export const SearchFilterContext = createContext<ContextValue | undefined>(
  undefined
);

/* ---------- Provider ---------- */

const STORAGE_KEYS = {
  LOCATION_ENABLED: "search_location_enabled",
};

export const SearchFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [locationOn, setLocationOnState] = useState(false);

  /* ---------- Restore toggle ---------- */
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(
        STORAGE_KEYS.LOCATION_ENABLED
      );
      if (saved === "true") {
        setLocationOnState(true);
        await useCurrentLocation();
      }
    })();
  }, []);

  /* ---------- GPS logic ---------- */

  const useCurrentLocation = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const pos = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    console.log("Current position:", pos);

    const geo = await Location.reverseGeocodeAsync({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });

    if (!geo.length) return;

    const { region, subregion, city } = geo[0];
    console.log("Geocoded location:", geo[0]);

    const mapped = mapSriLankaLocation(region, subregion, city);
    console.log("Mapped location:", mapped);

    if (mapped.province)
      dispatch({ type: "SET_PROVINCE", payload: mapped.province });

    if (mapped.district)
      dispatch({ type: "SET_DISTRICT", payload: mapped.district });

    if (mapped.city)
      dispatch({ type: "SET_CITY", payload: mapped.city });
  };

  /* ---------- Toggle ---------- */

  const setLocationOn = async (value: boolean) => {
    setLocationOnState(value);
    await AsyncStorage.setItem(
      STORAGE_KEYS.LOCATION_ENABLED,
      String(value)
    );

    if (value) {
      await useCurrentLocation();
    } else {
      dispatch({ type: "RESET_LOCATION" });
    }
  };

  return (
    <SearchFilterContext.Provider
      value={{
        state,
        locationOn,
        setLocationOn,

        setCategory: (payload) =>
          dispatch({ type: "SET_CATEGORY", payload }),
        setProvince: (payload) =>
          dispatch({ type: "SET_PROVINCE", payload }),
        setDistrict: (payload) =>
          dispatch({ type: "SET_DISTRICT", payload }),
        setCity: (payload) =>
          dispatch({ type: "SET_CITY", payload }),
        resetLocation: () =>
          dispatch({ type: "RESET_LOCATION" }),
        resetAll: () =>
          dispatch({ type: "RESET_ALL" }),

        useCurrentLocation,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};
