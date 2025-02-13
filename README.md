# frontendtest12022025
Prueba Técnica Desarrollador Java (Frontend)

- Proyecto (Task Management): El flujo inicia con el registro de Usuarios para que cada uno pueda registrar Tareas y a su vez cada tarea puede tener uno o muchos archivos referenciados.
  - Se manejan 2 roles;
    - ROLE_ADMIN: Tiene acceso y visibilidad de los usuarios para registrar, actualizar y eliminarlos. Haciendo referencia del usuario puede registrar tareas y cargar archivos.
    - ROLE_USER: Tiene acceso a sus datos para actualizar, registrar tareas y cargar archivos.
    
- REST API (Swagger): http://localhost:8080/swagger-ui/index.html para consumo del Frontend
- Endpoints disponibles: GET, POST, PUT, DELETE

## Ver en navegador http://localhost:3000/

1. Login
    - Para validar usuario y generar token
2. Logout
    - Para invalidar usuario token
3. CRUD Usuario
4. CRUD Tarea por Usuario
5. Carga, Actualización de Nombre y Eliminación de Archivo por Tarea

**Herramientas implementadas**
- Nodejs v18.20.6
- React v18.2.0
- Visual Studio Code
- LocalStorage

**Usuarios de prueba creados en el backend**
- ROLE_ADMIN
  - usernam: admin
  - password: admin

- ROLE_USER
  - usernam: user1
  - password: 12345678
 
  - usernam: user2
  - password: 12345678
 
**Configuración Desarrollo**
```java
- En package.json agregar "proxy": "http://localhost:8080" para entorno de desarrollo si y solo si cors en backend restringe peticiones.
