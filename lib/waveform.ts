export type WaveBar = {
  /** Height as a percentage of the strip. */
  height: number;
  /** Animation offset, so the bars ripple rather than pulse in unison. */
  delay: string;
};

/**
 * The hero waveform, reproduced from the design's generator.
 *
 * Deterministic by construction — a sine-based hash stands in for `Math.random`
 * so server and client renders agree and the silhouette never shifts.
 */
export function buildWaveform(count = 80): WaveBar[] {
  const bars: WaveBar[] = [];
  for (let i = 0; i < count; i++) {
    const x = i / (count - 1);
    const envelope = 0.2 + 0.8 * Math.sin(x * Math.PI);
    const noise = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
    bars.push({
      height: Math.max(5, Math.round(envelope * (0.4 + 0.6 * noise) * 100)),
      delay: `${(i * 0.026).toFixed(3)}s`,
    });
  }
  return bars;
}
