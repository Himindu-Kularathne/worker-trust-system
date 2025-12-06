const LANGS = ["en", "si", "ta"] as const;
type Lang = (typeof LANGS)[number];
export { LANGS, Lang };
