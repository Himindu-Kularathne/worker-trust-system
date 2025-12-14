import React, { createContext, useContext, useReducer, ReactNode } from "react";

export type SearchFilters = {
  category?: string;
  province?: string;
  district?: string;
  city?: string;
};

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
      return {
        ...state,
        category: action.payload,
      };

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
  setCategory: (category?: string) => void;
  setProvince: (province?: string) => void;
  setDistrict: (district?: string) => void;
  setCity: (city?: string) => void;
  resetLocation: () => void;
  resetAll: () => void;
}

export const SearchFilterContext = createContext<ContextValue | undefined>(
  undefined
);

export const SearchFilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchFilterContext.Provider
      value={{
        state,
        setCategory: (payload) => dispatch({ type: "SET_CATEGORY", payload }),
        setProvince: (payload) => dispatch({ type: "SET_PROVINCE", payload }),
        setDistrict: (payload) => dispatch({ type: "SET_DISTRICT", payload }),
        setCity: (payload) => dispatch({ type: "SET_CITY", payload }),
        resetLocation: () => dispatch({ type: "RESET_LOCATION" }),
        resetAll: () => dispatch({ type: "RESET_ALL" }),
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};
