import { Image, Modal, Pressable, StyleSheet, View, Text } from "react-native";
import { useLanguage } from "@/src/i18n/languageContext";
import { useState } from "react";

const LANGS = ["en", "si", "ta"] as const;

export default function LanguageButton() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const selectLanguage = (lang: "en" | "si" | "ta") => {
    setLang(lang);
    setOpen(false);
  };
  const onPress = () => {
    const nextIndex = (LANGS.indexOf(lang) + 1) % LANGS.length;
    setLang(LANGS[nextIndex]);
  };

  return (
    <>
      <Pressable onPress={onPress} style={styles.button}>
        <Image source={require("@/assets/images/lang.png")} style={styles.image} />
      </Pressable>
      <Modal transparent animationType="fade" visible={open}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            <Pressable onPress={() => selectLanguage("en")} style={styles.item}>
              <Text>English</Text>
            </Pressable>

            <Pressable onPress={() => selectLanguage("si")} style={styles.item}>
              <Text>සිංහල</Text>
            </Pressable>

            <Pressable onPress={() => selectLanguage("ta")} style={styles.item}>
              <Text>தமிழ்</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: { padding: 8 },
  image: { width: 32, height: 32 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    width: 160,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
