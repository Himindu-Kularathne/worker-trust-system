import { useContext } from "react";
import { SearchFilterContext } from "../context/SearchFilterContext";

export const useSearchFilters = () => {
  const context = useContext(SearchFilterContext);
  if (!context) {
    throw new Error(
      "useSearchFilters must be used within SearchFilterProvider"
    );
  }
  return context;
};
