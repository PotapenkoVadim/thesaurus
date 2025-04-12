import Database from "@tauri-apps/plugin-sql";
import { DB_NAME } from "../constants";
import { Settings } from "../interfaces/Settings";

export const selectSettings = async () => {
  const db = await Database.load(DB_NAME);
  const dbSettings = await db.select<Settings[]>(`SELECT * FROM user_settings WHERE id = 1`);
  await db.close();
  
  return dbSettings[0];
}