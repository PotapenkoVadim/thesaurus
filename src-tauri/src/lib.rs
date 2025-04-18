use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "
                CREATE TABLE IF NOT EXISTS words (
                    id INTEGER PRIMARY KEY,
                    word TEXT UNIQUE NOT NULL,
                    description TEXT
                );
                CREATE TABLE IF NOT EXISTS word_synonyms (
                    word_id INTEGER NOT NULL,
                    synonym_id INTEGER NOT NULL,
                    FOREIGN KEY(word_id) REFERENCES words(id),
                    FOREIGN KEY(synonym_id) REFERENCES words(id)
                );
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_synonyms_trigger",
            sql: "
                CREATE TRIGGER IF NOT EXISTS delete_word_synonyms
                AFTER DELETE ON words
                FOR EACH ROW
                BEGIN
                    DELETE FROM word_synonyms WHERE word_id = OLD.id OR synonym_id = OLD.id;
                END;
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_settings",
            sql: "
                CREATE TABLE IF NOT EXISTS settings (
                    id INTEGER PRIMARY KEY,
                    theme TEXT DEFAULT 'dark',
                    font INTEGER DEFAULT 16
                );

                INSERT INTO settings (id, theme, font)
                VALUES (1, 'dark', 16)
                ON CONFLICT(id) DO UPDATE SET theme=excluded.theme, font=excluded.font;
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create_user_settings",
            sql: "
                CREATE TABLE IF NOT EXISTS settings (
                    id INTEGER PRIMARY KEY,
                    theme TEXT DEFAULT 'dark',
                    font TEXT DEFAULT 'regular'
                );

                INSERT INTO settings (id, theme, font)
                VALUES (1, 'dark', 'regular')
                ON CONFLICT(id) DO UPDATE SET theme=excluded.theme, font=excluded.font;
                DROP TABLE settings;
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "create_user_settings_1",
            sql: "
                CREATE TABLE IF NOT EXISTS user_settings (
                    id INTEGER PRIMARY KEY,
                    theme TEXT DEFAULT 'dark',
                    font TEXT DEFAULT 'regular'
                );

                INSERT INTO user_settings (id, theme, font)
                VALUES (1, 'dark', 'regular')
                ON CONFLICT(id) DO UPDATE SET theme=excluded.theme, font=excluded.font;
            ",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:mydatabase.db", migrations)
                .build()
        )
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
