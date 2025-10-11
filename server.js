// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Conexión a MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // cambia si tienes contraseña
  database: "rickdb",
});

// 🧩 Buscar por ID
app.get("/characters/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM characters WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Personaje no encontrado por ID" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error en /characters/id/:id:", error);
    res.status(500).json({ message: "Error al obtener personaje por ID" });
  }
});

// 🧩 Buscar por nombre (coincidencias parciales, sin importar mayúsculas/minúsculas)
app.get("/characters/:nombre", async (req, res) => {
  try {
    const nombre = req.params.nombre.trim().toLowerCase();

    const [rows] = await pool.query(
      "SELECT * FROM characters WHERE LOWER(nombre) LIKE ?",
      [`%${nombre}%`]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Personaje no encontrado por nombre" });
    }

    // Si hay varios resultados, devuélvelos todos
    res.json(rows);
  } catch (error) {
    console.error("❌ Error en /characters/:nombre:", error);
    res.status(500).json({ message: "Error al obtener personaje por nombre" });
  }
});

// 🚀 Ruta base
app.get("/", (req, res) => {
  res.json({ ok: true, message: "API Rick and Morty local funcionando 🚀" });
});

// 🟢 Iniciar servidor
app.listen(3000, "0.0.0.0", () => {
  console.log("✅ Servidor corriendo en http://192.168.1.5:3000");
});
