# Backend UserPokeAPI

## Descripción
Este proyecto es una API backend desarrollada con Node.js y Express, que permite a los usuarios gestionar una lista de Pokémones favoritos.

## Funcionalidades
- Creación de usuarios.
- Autenticación de usuarios.
- Obtención de la lista de usuarios.
- Añadir Pokémones a la lista de favoritos.
- Obtener la lista de Pokémones favoritos.
- Eliminar Pokémones de la lista de favoritos.
- Editar detalles de Pokémones favoritos.

## Tecnologías Utilizadas
- Node.js
- Express
- Mongoose
- JWT para autenticación
- Axios para peticiones HTTP

## Estructura del Proyecto

### Modelos
- **UserModel**: Modelo para los usuarios, incluyendo nombre de usuario, contraseña y lista de favoritos.
- **PokemonModel**: Modelo para los Pokémones, incluyendo nombre, tipo y sprite.

### Controladores
- **usersController**: Controladores para gestionar usuarios y Pokémones favoritos.
  - `createUser`: Crea un nuevo usuario.
  - `loginUser`: Autentica a un usuario.
  - `getUsers`: Obtiene todos los usuarios.
  - `addFavoritePokemon`: Añade un Pokémon a la lista de favoritos.
  - `getFavoritePokemons`: Obtiene los Pokémones favoritos de un usuario.
  - `removeFavoritePokemon`: Elimina un Pokémon de la lista de favoritos.
  - `editFavoritePokemon`: Edita detalles de un Pokémon favorito.

### Rutas
- **userRoutes**: Rutas relacionadas con los usuarios y sus Pokémones favoritos.
- **pokemonRoutes**: Rutas para obtener información de Pokémones específicos.

### Middleware
- **authMiddleware**: Middleware para verificar la autenticación del usuario.

### Servicios
- **userService**: Servicios para interactuar con la base de datos y realizar operaciones relacionadas con usuarios y Pokémones.

### Configuración
- **db.ts**: Configuración de la conexión a MongoDB.

### Utilidades
- **errorHandler**: Manejadores de errores personalizados.

## Instalación y Ejecución
Para ejecutar este proyecto, asegúrate de tener Node.js y npm instalados. Luego sigue estos pasos:
1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Configura las variables de entorno necesarias (por ejemplo, cadena de conexión a MongoDB, secreto JWT).
4. Ejecuta el servidor con `npm run dev`.

## Licencia
Este proyecto está bajo la licencia ISC.