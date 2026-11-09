# Rick and Morty API

API REST en Node.js y MySQL para buscar personajes de Rick and Morty por id o por nombre. Es el backend de la app [rick-front](https://github.com/nicolascamargom/rick-front).

## Tecnologías
Node.js · Express · MySQL (`mysql2`)

## Endpoints

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/characters/id/:id` | Trae un personaje por su id |
| GET | `/characters/:nombre` | Busca personajes cuyo nombre contenga el texto |

## Cómo correrlo

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Copia `.env.example` a `.env` y pon los datos de tu MySQL.
3. Carga los personajes:
   ```bash
   node seed_characters.js
   ```
4. Arranca el servidor en el puerto 3000:
   ```bash
   npm start
   ```
