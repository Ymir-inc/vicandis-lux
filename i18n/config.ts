export const locales = ['ro', 'ru', 'en'] as const;

export type Locale = (typeof locales)[number];

/** Romanian is the source language: it is the only fully-authored catalogue. */
export const defaultLocale: Locale = 'ro';

/** Label shown in the RO / RU / EN switcher. */
export const localeLabels: Record<Locale, string> = {
  ro: 'RO',
  ru: 'RU',
  en: 'EN',
};

/** `lang` attribute and hreflang value. */
export const localeTags: Record<Locale, string> = {
  ro: 'ro-MD',
  ru: 'ru-MD',
  en: 'en',
};

/**
 * Number formatting follows the active locale, independently of how much of
 * the message catalogue has been translated yet.
 */
export const numberLocales: Record<Locale, string> = {
  ro: 'ro-RO',
  ru: 'ru-RU',
  en: 'en-GB',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
