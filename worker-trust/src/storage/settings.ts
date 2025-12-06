import AsyncStorage from "@react-native-async-storage/async-storage";

const LANG_KEY = "APP_LANGUAGE";

export async function saveLanguage(lang: "en" | "si" | "ta") {
  try {
    await AsyncStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    console.warn("Failed to save language", e);
  }
}

export async function loadLanguage(): Promise<"en" | "si" | "ta" | null> {
  try {
    return (await AsyncStorage.getItem(LANG_KEY)) as "en" | "si" | "ta" | null;
  } catch (e) {
    console.warn("Failed to load language", e);
    return null;
  }
}
