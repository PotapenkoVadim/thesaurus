import Database from "@tauri-apps/plugin-sql";
import { DB_NAME } from "../constants";

export const deleteWordById = async (id: string) => {
  const db = await Database.load(DB_NAME);
  await db.execute(`DELETE FROM words WHERE id = ${id}`);
  await db.close();
}