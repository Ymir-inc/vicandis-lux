export type ConfiguratorField = 'eventType' | 'interp' | 'sound' | 'video' | 'streaming';

export type ConfiguratorAnswers = Record<ConfiguratorField, string>;

export const emptyAnswers: ConfiguratorAnswers = {
  eventType: '',
  interp: '',
  sound: '',
  video: '',
  streaming: '',
};

/**
 * Price weights in EUR per event day, keyed by option key.
 *
 * These are commercial figures, not copy — they stay in code so they cannot
 * drift between locales. The keys must match `configurator.steps[].options[].key`
 * in the message catalogues.
 */
const WEIGHTS: Record<Exclude<ConfiguratorField, 'eventType'>, Record<string, number>> = {
  interp: { integral: 1400, masa: 900, portabil: 450, nu: 0 },
  sound: { mica: 300, medie: 600, mare: 1200 },
  video: { proiectie: 300, led: 1500, monitoare: 250, nu: 0 },
  streaming: { live: 900, inregistrare: 350, ambele: 1100, nu: 0 },
};

/** Flat charge that applies as soon as an event type is chosen. */
const BASE = 350;

/** Upper bound of the quoted range, as a multiple of the lower bound. */
const SPREAD = 1.18;

const roundTo50 = (value: number) => Math.round(value / 50) * 50;

export function estimate(answers: ConfiguratorAnswers): { low: number; high: number } {
  const subtotal =
    (answers.eventType ? BASE : 0) +
    (WEIGHTS.interp[answers.interp] ?? 0) +
    (WEIGHTS.sound[answers.sound] ?? 0) +
    (WEIGHTS.video[answers.video] ?? 0) +
    (WEIGHTS.streaming[answers.streaming] ?? 0);

  return { low: roundTo50(subtotal), high: roundTo50(subtotal * SPREAD) };
}
