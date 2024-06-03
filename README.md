# Tienda de Indumentaria

Este proyecto es una tienda de indumentaria que permite a los usuarios navegar por los productos, agregar productos al carrito de compras y finalizar la compra. Además, incluye un sistema de autenticación de usuarios y gestión de productos.

## Características

- Navegación de productos
- Carrito de compras
- Finalización de compra
- Registro e inicio de sesión de usuarios
- Gestión de productos (CRUD)
- Sistema de stock

## Tecnologías Utilizadas

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express, MongoDB

## Requisitos Previos

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Estructura del Proyecto

### FrontEnd
- index.html: Página principal donde se muestran los productos y el carrito de compras.
- login.html: Página de inicio de sesión.
- register.html: Página de registro de nuevos usuarios.
- styles.css: Archivo de estilos para las páginas.
- script.js: Manejo de productos y carrito de compras.
- auth.js: Manejo de autenticación (registro e inicio de sesión).
### BackEnd
- app.js: Configuración del servidor y rutas principales.
- models/User.js: Modelo de datos para usuarios.
- models/Product.js: Modelo de datos para productos.
- routes/productRoutes.js: Rutas para gestión de productos.
  
## Uso

### Navegación de Productos
  Al abrir index.html, se mostrará una lista de productos disponibles. Cada producto incluye una imagen, nombre, descripción y precio. Los usuarios pueden agregar productos al carrito de compras.
  
### Carrito de Compras
  Los productos agregados al carrito se mostrarán en la sección de carrito de compras. El total del carrito se actualiza automáticamente. Los usuarios pueden eliminar productos del carrito y finalizar la compra.

### Autenticación de Usuarios
  Los usuarios pueden registrarse en register.html e iniciar sesión en login.html. Después de iniciar sesión, se almacena un token JWT en el almacenamiento local para autenticar las solicitudes.

### Gestión de Productos
  El backend incluye rutas para crear, leer, actualizar y eliminar productos. Solo los usuarios autenticados pueden acceder a estas rutas.


