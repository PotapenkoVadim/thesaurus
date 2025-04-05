import Database from "@tauri-apps/plugin-sql";
import { FormWord } from "../interfaces";
import { DB_NAME } from "../constants";

export const insertNewWord = async (word: FormWord) => {
  const {word: wordText, description, synonymsIds} = word;
  const db = await Database.load(DB_NAME);
  const {lastInsertId} = await db.execute("INSERT INTO words (word, description) VALUES ($1, $2)", [
    wordText,
    description,
  ]);

  if (synonymsIds && synonymsIds.length > 0) {
    for (let id of synonymsIds) {
      await db.execute("INSERT INTO word_synonyms (word_id, synonym_id) VALUES ($1, $2)", [
        lastInsertId,
        id,
      ]);
    }
  }

  await db.close();

  return lastInsertId;
}