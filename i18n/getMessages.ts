import ro from './messages/ro.json';
import ru from './messages/ru.json';
import en from './messages/en.json';
import { defaultLocale, type Locale } from './config';

/** The Romanian catalogue is the contract every other locale is measured against. */
export type Messages = typeof ro;

const catalogues: Record<Locale, unknown> = { ro, ru, en };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Fills gaps in a partially-translated catalogue from the Romanian source.
 *
 * Arrays are taken whole or not at all — a translator who has localised
 * `pricing.packages` gets their version; one who has not gets Romanian rather
 * than a list spliced together from two languages.
 */
function mergeWithFallback<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;

  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  if (isPlainObject(base)) {
    if (!isPlainObject(override)) return base;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(base)) {
      out[key] = mergeWithFallback((base as Record<string, unknown>)[key], override[key]);
    }
    return out as T;
  }

  // Only accept a translated primitive if it is the same type as the source.
  return (typeof override === typeof base ? override : base) as T;
}

export function getMessages(locale: Locale): Messages {
  if (locale === defaultLocale) return ro;
  return mergeWithFallback(ro, catalogues[locale]);
}
