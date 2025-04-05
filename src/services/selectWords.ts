import Database from "@tauri-apps/plugin-sql";
import { DB_NAME } from "../constants";
import { Word } from "../interfaces";

export const selectWords = async (searchText: string) => {
  const db = await Database.load(DB_NAME);
  const dbWords = await db.select<Word[]>(`SELECT * FROM words WHERE LOWER(word) LIKE LOWER('%${searchText}%')`);
  await db.close();

  return dbWords;
}