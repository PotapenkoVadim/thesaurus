import Database from "@tauri-apps/plugin-sql";
import { DB_NAME } from "../constants";
import { Settings } from "../interfaces/Settings";

export const updateSettings = async ({theme, font}: Partial<Settings>) => {
  const db = await Database.load(DB_NAME);
  await db.execute(`UPDATE user_settings SET font = '${font}', theme = '${theme}' WHERE id = 1;`);
  await db.close();
}