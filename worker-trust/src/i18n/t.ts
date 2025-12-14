import i18n from "./index";

export type TranslateOptions = {
  [key: string]: string | number;
};

export type TranslationKey =
  | "home.serviceCategories"
  | "workers.found"
  | "home.greeting"
  | "welcome"
  | "login"
  | "logout"
  | "user"
  | "home.subHeading"
  | `categories.${string}`
  | "tabs.home"
  | "tabs.search"
  | "tabs.profile"
  | "tabs.settings";

export function t(
  key: TranslationKey,
  options?: TranslateOptions
): string {
  return i18n.t(key, options) as string;
}
