import Database from "@tauri-apps/plugin-sql";
import { DB_NAME } from "../constants";
import { FormWord } from "../interfaces";

export const updateWordById = async (value: FormWord, id: string) => {
  const {word, description, synonymsIds} = value;
  const db = await Database.load(DB_NAME);
  await db.execute(`UPDATE words SET word = '${word}', description = '${description}' WHERE id = ${id}`);

  if (Array.isArray(synonymsIds)) {
    await db.execute(`DELETE FROM word_synonyms WHERE word_id = ${id} OR synonym_id = ${id};`);
    for (let synonymId of synonymsIds) {
      await db.execute("INSERT INTO word_synonyms (word_id, synonym_id) VALUES ($1, $2)", [
        id,
        synonymId,
      ]);
    }
  }

  await db.close();
}