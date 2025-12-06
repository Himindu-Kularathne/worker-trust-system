import { I18n } from "i18n-js";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./locales/en-US/translation.json";
import si from "./locales/si_LK/translation.json";
import ta from "./locales/ta/translation.json";

const i18n = new I18n({
  en,
  si,
  ta,
});

const deviceLocale = Localization.getLocales()[0]?.languageCode ?? "en";

i18n.locale = deviceLocale;
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export default i18n;
