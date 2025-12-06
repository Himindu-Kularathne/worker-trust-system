import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "./index";
import { loadLanguage } from "../storage/settings";

export type Lang = "en" | "si" | "ta";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LangContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await loadLanguage();
      if (stored) {
        i18n.locale = stored;
        setLangState(stored);
      }
      setReady(true);
    })();
  }, []);

  const setLang = (newLang: Lang) => {
    i18n.locale = newLang;
    setLangState(newLang); // to rerender
  };

  if (!ready) return null;

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
