// Shared helpers for sorting Recognition-style entries newest-first, whether
// they're keyed by a bare year ("2020") or a date in a few common formats.
export const toYearNum = (y: string | number) =>
  Number(String(y).match(/\d{4}/)?.[0] ?? -1);

export const toDateKey = (d: string) => {
  const mmYy = d.match(/(\d{1,2})[/-](\d{4})/);
  if (mmYy) return +mmYy[2] * 100 + +mmYy[1];
  const yMd = d.match(/(\d{4})-(\d{1,2})/);
  if (yMd) return +yMd[1] * 100 + +yMd[2];
  const monYy = d.match(/([A-Za-z]{3,})\s+(\d{4})/);
  if (monYy) {
    const m =
      ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(
        monYy[1].slice(0, 3).toLowerCase(),
      ) + 1;
    return +monYy[2] * 100 + (m || 0);
  }
  const yr = d.match(/\d{4}/);
  return yr ? +yr[0] * 100 : -1;
};
