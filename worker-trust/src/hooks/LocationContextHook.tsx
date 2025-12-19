import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";


export const useLocationContext = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error(
      "useLocationContext must be used inside LocationProvider"
    );
  }
  return ctx;
};