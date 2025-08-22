# Inventory Management API

API REST para manejo de inventario, productos y compras. Desarrollada con Node.js, TypeScript, Sequelize y PostgreSQL.  

Incluye autenticación JWT, roles de usuario y documentación con Swagger.

---

## Tecnologías

- Node.js 22.18.0
- TypeScript
- Express
- Sequelize
- PostgreSQL
- Docker & Docker Compose
- PGAdmin
- Swagger (documentación de endpoints)

---

## Levantar el proyecto con Docker

1. Crear un archivo `.env` en la raíz del proyecto con la configuración de tu entorno. Por ejemplo:

```env
# Base de datos
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=inventory_db

# API
PORT=3000

# PGAdmin
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```

> **Nota:** `DB_HOST=db` porque dentro de Docker el contenedor de la base de datos se llama `db`. La API usa estas variables de entorno para conectarse a la base de datos y configurar el puerto.

2. Levantar los contenedores:

```bash
docker compose up --build
```

3. Correr migraciones y seeders:

```bash
docker compose exec api npx sequelize-cli db:migrate
docker compose exec api npx sequelize-cli db:seed:all
```

---

## Acceso a PGAdmin

- URL: [http://localhost:8080](http://localhost:8080)  
- Usuario: `admin@admin.com`  
- Contraseña: `admin`  

Dentro de PGAdmin, crea un servidor con los datos de tu contenedor PostgreSQL usando las variables de `.env`.

---

## API

La API corre por defecto en [http://localhost:3000](http://localhost:3000)  

### Endpoints principales

- **Usuarios**
  - `POST /users` → Crear usuario
- **Autenticación**
  - `POST /auth/login` → Login
- **Productos**
  - `POST /products` → Crear producto (requiere admin)
  - `GET /products` → Obtener todos los productos
  - `GET /products/:id` → Obtener producto por ID
  - `PUT /products/:id` → Actualizar producto (requiere admin)
  - `DELETE /products/:id` → Eliminar producto (requiere admin)
- **Compras**
  - `POST /purchases` → Crear compra (requiere autenticación)
  - `GET /purchases/:id` → Obtener compra por ID
  - `GET /purchases/history` → Obtener historial de compras del usuario

### Documentación Swagger

Disponible en [http://localhost:3000/api/docs/](http://localhost:3000/api/docs/) una vez que la API esté corriendo.  

---

## Notas

- Los endpoints protegidos requieren token JWT en el header `Authorization: Bearer <token>`.  
- Las migraciones y seeders deben correr después de levantar los contenedores para que la base de datos esté lista.  
- Las variables de entorno controlan la conexión a la base de datos, el puerto de la API y PGAdmin.
