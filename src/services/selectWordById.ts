import Database from "@tauri-apps/plugin-sql";
import { DB_NAME } from "../constants";
import { Word } from "../interfaces";

interface DbWord {
  id: number;
  word: string;
  description?: string;
  synonyms?: string
}

export const selectWordById = async (id: string): Promise<Word> => {
  const db = await Database.load(DB_NAME);
  const dbWord = await db.select<Array<DbWord>>(`
    SELECT 
      w.id,
      w.word,
      w.description,
      COALESCE(
        (
          SELECT JSON_GROUP_ARRAY(
            JSON_OBJECT(
              'id', syn.id,
              'word', syn.word,
              'description', syn.description
            )
          )
          FROM (
            SELECT DISTINCT words.*
            FROM word_synonyms
            JOIN words ON 
              (word_synonyms.word_id = w.id AND word_synonyms.synonym_id = words.id)
              OR
              (word_synonyms.synonym_id = w.id AND word_synonyms.word_id = words.id)
              WHERE words.id != w.id
          ) syn
        ),
        JSON_ARRAY()
      ) AS synonyms
    FROM words w
    WHERE w.id = ${id};
  `);

  await db.close();

  return {
    ...dbWord[0],
    synonyms: dbWord[0].synonyms ? JSON.parse(dbWord[0].synonyms) : null
  };
}