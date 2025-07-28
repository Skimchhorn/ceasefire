// lib/quran.ts
export async function fetchQuranTranslation(
  translation: string = "english"
) {
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${translation}.json`
  );
  if (!res.ok) throw new Error("Failed to load Quran translation");
  return res.json() as Promise<QuranVerse[]>;
}

// types.ts
export interface QuranVerse {
  surahName: string;
  surahNo: number;
  ayahNo: number;
  text: string;
  translation: string[];
}
