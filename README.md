

# Movie & User API - NestJS Server (v2)

Esta es una API REST robusta construida con **NestJS** y **MongoDB**. A diferencia de versiones anteriores, este servidor no solo gestiona un catálogo de películas, sino que también incluye un sistema completo de **usuarios, autenticación segura y una lista personalizada de películas favoritas**.

## 🛠️ Tecnologías y Librerías

* **Framework**: [NestJS](https://nestjs.com/)
* **Base de Datos**: MongoDB con **Mongoose** (Modelos y Schemas)
* **Seguridad**:
* `bcrypt`: Hashing de contraseñas.
* `@nestjs/jwt`: Generación y validación de tokens.
* **Guards**: Protectores de rutas personalizados (`AuthGuard`).


* **Validación**: `class-validator` y `class-transformer` mediante DTOs.

## 🚀 Configuración del Proyecto

1. **Variables de Entorno (`.env`)**:
Es necesario configurar las siguientes variables para que el servidor funcione:
```env
URI=tu_conexion_mongodb_atlas
SECRET=clave_secreta_para_jwt

```


2. **Instalación y despliegue**:
```bash
npm install
npm run start:dev

```



## 🛣️ Endpoints de la API

La API está estructurada bajo el prefijo global `/api/v1`.

### 🎬 Películas (`/movies`)

* `GET /`: Listado completo.
* `GET /paginated`: Listado con soporte de paginación.
* `POST /create`: Añadir nueva película.
* `PUT /update/:id` & `PATCH /update/:id`: Edición de registros.
* `DELETE /delete/:id`: Eliminación física de la base de datos.

### 👤 Usuarios y Autenticación (`/users`)

* `POST /register`: Crea un nuevo usuario con contraseña encriptada.
* `POST /login`: Valida credenciales y devuelve un **JWT**.
* `GET /user-info`: (Protegido) Devuelve la información del usuario autenticado a través del token.

### ❤️ Favoritos (Gestión entre colecciones)

Estas rutas requieren que el usuario esté autenticado enviando el token en la cabecera `x-token`.

* `POST /favorites/:movieId`: Añade una película al array de favoritos del usuario.
* `GET /favorites`: Recupera la lista de películas favoritas del usuario (utiliza `populate` para traer los datos de las películas, no solo los IDs).

## 🛡️ Características de Seguridad Avanzadas

### AuthGuard Personalizado

Se ha implementado un `AuthGuard` que:

1. Extrae el token de la cabecera `x-token`.
2. Verifica la validez del token mediante el `JwtService`.
3. Inyecta el **payload** (datos del usuario) directamente en el objeto `Request`. Esto permite que los controladores accedan al `userId` de forma segura sin tener que decodificar el token de nuevo.

### Validación de Datos (DTOs)

Cada entrada de datos está protegida por objetos de transferencia de datos que aseguran:

* Formatos de Email válidos.
* Longitudes mínimas de contraseña.
* Tipos de datos correctos en los campos de películas (títulos, años, ratings).

## 🗃️ Modelos de Datos

* **Movie Schema**: Contiene títulos, géneros, año, director y un objeto anidado para datos de IMDB.
* **User Schema**: Contiene email, nombre de usuario, contraseña (hash) y una referencia (`type: Schema.Types.ObjectId`) a la colección de películas para los favoritos.

---

*Este proyecto forma parte de la formación de **Digitech Progresa** para el desarrollo de APIs profesionales con Node.js por **Francisco Belda** *
