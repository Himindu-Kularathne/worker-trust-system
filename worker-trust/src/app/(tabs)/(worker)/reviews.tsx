import { Button, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import i18n from "@/src/i18n";
import { useState } from "react";
import LanguageButton from "../../../ui-components/langButton";
import { useLanguage } from "@/src/i18n/languageContext";
import ThemeToggle from "../../../ui-components/themeToggle";
import { useAppTheme } from "@/src/context/AppThemeContext";

export const changeLanguage = (lang: "en" | "si" | "ta") => {
  i18n.locale = lang;
};

console.log("Current Language:", i18n.locale);

export default function TabOneScreen() {
  const { lang } = useLanguage();
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={styles.title}>Worker Trust System</Text>
      <Text style={styles.title}>{i18n.t("welcome")}</Text>
      <LanguageButton />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      {/* <Button title="English" onPress={() => changeLanguage("en")} />
      <Button title="සිංහල" onPress={() => changeLanguage("si")} />
      <Button title="தமிழ்" onPress={() => changeLanguage("ta")} /> */}
      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
