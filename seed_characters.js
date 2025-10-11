const fetch = require("node-fetch");
const mysql = require("mysql2/promise");
require("dotenv").config();

(async () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "rickdb",
    port: Number(process.env.DB_PORT || 3306),
  });

  try {
    console.log("🚀 Iniciando seed de personajes...");
    let page = 1;
    const maxPages = 3; 

    while (page && page <= maxPages) {
      console.log(`📄 Descargando página ${page}...`);
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      if (!res.ok) break;

      const j = await res.json();
      const characters = j.results || [];

      for (const c of characters) {
        await pool.query(
          `INSERT INTO characters (id, nombre, especie, estado, imagen)
           VALUES (?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             nombre = VALUES(nombre),
             especie = VALUES(especie),
             estado = VALUES(estado),
             imagen = VALUES(imagen)`,
          [c.id, c.name, c.species, c.status, c.image || null]
        );
      }

      console.log(`✅ Página ${page} insertada correctamente.`);
      page = j.info && j.info.next ? page + 1 : null;
    }

    console.log("Seed completado exitosamente.");
    await pool.end();
  } catch (e) {
    console.error(" Error durante el seed:", e);
    process.exit(1);
  }
})();
