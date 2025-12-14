import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

import en from "./locales/en-US/translation.json";
import si from "./locales/si_LK/translation.json";
import ta from "./locales/ta/translation.json";

const i18n = new I18n({
  en,
  si,
  ta,
});

i18n.defaultLocale =
  Localization.getLocales()[0]?.languageCode ?? "en";

i18n.enableFallback = true;

export default i18n;
