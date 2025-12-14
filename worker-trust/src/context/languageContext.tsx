import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "../i18n";
import { loadLanguage, saveLanguage } from "../storage/settings";

export type Lang = "en" | "si" | "ta";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => Promise<void>;
};

const LanguageContext = createContext<LangContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initLanguage = async () => {
      const storedLang = await loadLanguage();

      const finalLang: Lang = storedLang ?? "en";
      i18n.locale = finalLang;
      setLangState(finalLang);

      setReady(true);
    };

    initLanguage();
  }, []);

  const setLang = async (newLang: Lang) => {
    i18n.locale = newLang;
    setLangState(newLang);
    await saveLanguage(newLang);
  };

  if (!ready) return null;

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
