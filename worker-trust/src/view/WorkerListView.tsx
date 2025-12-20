import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView} from "react-native";

import WorkersHeaderSection from "@/src/sections/workers/WorkerHeaderSection";
import WorkersListSection from "@/src/sections/workers/WorkersListSection";
import { useSearchFilters } from "@/src/hooks/useSearchFilterHook";
import { useTheme } from "@/src/hooks/useThemeHook";

const WorkersListView: React.FC = () => {
  const { state , useCurrentLocation, locationOn} = useSearchFilters();
  const { category } = state;
  const { theme } = useTheme();

  useEffect(() => {
  if (locationOn) {
    useCurrentLocation();
  }
}, [locationOn]);

  return (
    <SafeAreaView
      style={[
        styles.containerW,
        { backgroundColor: theme.background },
      ]}
    >
      <WorkersHeaderSection category={category ?? ""} />
      <WorkersListSection />
    </SafeAreaView>
  );
};

export default WorkersListView;

const styles = StyleSheet.create({
  containerW: {
    flex: 1,
  },
});
