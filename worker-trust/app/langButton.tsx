import { Image, Pressable, StyleSheet } from "react-native";
import { useLanguage } from "@/src/i18n/languageContext";

const LANGS = ["en", "si", "ta"] as const;

export default function LanguageButton() {
  const { lang, setLang } = useLanguage();

  const onPress = () => {
    const nextIndex = (LANGS.indexOf(lang) + 1) % LANGS.length;
    setLang(LANGS[nextIndex]);
  };

  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Image source={require("@/assets/images/lang.png")} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { padding: 8 },
  image: { width: 32, height: 32 },
});
