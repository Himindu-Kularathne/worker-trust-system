import { Button, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import i18n from "@/src/i18n";
import { useState } from "react";
import LanguageButton from "../langButton";

export const changeLanguage = (lang: "en" | "si" | "ta") => {
  i18n.locale = lang;
};

console.log("Current Language:", i18n.locale);

export default function TabOneScreen() {
  const [, forceUpdate] = useState(0);
  const changeLanguage = (lang: "en" | "si" | "ta") => {
    i18n.locale = lang;
    forceUpdate((v) => v + 1); // ✅ force rerender
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Worker Trust System</Text>
      <Text style={styles.title}>{i18n.t("welcome")}</Text>
      <LanguageButton />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      {/* <Button title="English" onPress={() => changeLanguage("en")} />
      <Button title="සිංහල" onPress={() => changeLanguage("si")} />
      <Button title="தமிழ்" onPress={() => changeLanguage("ta")} /> */}
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
