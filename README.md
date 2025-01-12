<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Vehicles API

**Descripción:**

Se presenta una REST-API de transferencia de vehículos escrita en Nest.Js cuyos datos se almacenan en PostgreSQL y son manejados con TypeORM mediante entidades, con los requisitos que fueron establecidos en la explicación de la prueba.

Pese a que no fueron requeridos, se desarrollaron los C.R.U.D's, DTO's y endpoints para las 7 entidades especificadas en el documento, ya que, implícitamente era necesario contar con ellos para poder probar (mediante postman) que las las relaciones entre entidades estuvieran bien constituidas. La relación de Usuarios y Roles y todo lo que implicaba la lógica de transferencia de Vehículos, requería que las 7 entidades estuvieran conectadas.

A pesar de ello, los endpoints fuertemente validados son los de Usuarios y Transferencias.

Todos los DTO's para cada entidad fueron validados con class-validator


Se hace uso de una autenticación basada en roles (ADMIN , USER), en donde sólo los usuarios registrados bajo el rol de admin pueden hacer peticiones a cualquiera de las rutas. Esta autenticación está respaldada con JWT que es validado para cada petición, es decir. Todas las rutas fueron protegidas.

Para el caso de las rutas /transfer. Tienen una validación especial. Cada ruta está asociada a un permiso específico almacenado en base de datos, asociado al rol ADMIN, y que es validado en el código por medio de un Guard


A continuación, se presentan los endpoints desarrollados

**1. Crear roles y permisos**

**ROLES**


* GET **http://localhost:3000/roles/**: Obtiene todos los roles almacenados en base de datos.

* GET **http://localhost:3000/roles/id**: Obtiene el rol con el id enviado, si no existe, regresa un 404.

* POST **http://localhost:3000/roles**: Crea un rol con el siguiente body;
```
{
    "name": "admin",
    "description": "Platform admin",
    "permissions": [
        {
            "name": "view_transfers",
            "description": "Can view transfers"
        },
        {
            "name": "edit_transfers",
            "description": "Can edit transfers"
        },
        {
            "name": "delete_transfers",
            "description": "Can delete transfers"
        }
    ]
}
```

o bien, si se dese incluir un permiso existente:

```
{
    "name": "user",
    "description": "Platform user",
    "permission_ids": [1]
}
```

* PUT **http://localhost:3000/roles/id/**: Modifica el rol almacenado en base de datos que corresponda con el id enviado, si no existe el registro, regresa un 404.

```
{
    "name": "user",
    "description": "Platform user",
    "permission_ids": []
}
```
* DELETE **http://localhost:3000/roles/id**: Elimina el rol almacenado en base de datos que corresponda con el id enviado, si no existe el registro, regresa un 404.

  



**REGISTER and USERS**

* POST **http://localhost:3000/auth/register**: Registra un usuario en base de datos con el siguiente body: Se realizan validaciones de email, contraseña y rol
```
{
    "username": "Gabriel",
    "email": "oliveiragabr@outlook.com",
    "role_id": 1,
    "password": "123456gG"
}
```

* POST **http://localhost:3000/auth/login**: Loguea a un usuario existente, regresa la información del usuario y su token JWT.
```
{
    "email": "oliveiragabr@outlook.com",
    "password": "123456gG"
}
```
* PUT **http://localhost:3000/users/id**: Modifica el usuario referido por el id enviado.

```
{
    "username": "Gabriel",
    "email": "oliveiragabr@outlook.com",
    "role_id": 1,
    "password": "123456gG"
}
```
* GET **http://localhost:3000/users**: Obtiene la lista de todos los usuario registrados en el sistema.

* POST **http://localhost:3000/users/id**: Obtiene el usuario referido por el id enviado.

* DELETE **http://localhost:8000/users/id**: Elimina una usuario que corresponda con el id enviado.


**PROJECTS**


* GET **http://localhost:3000/projects/**: Obtiene todos los proyectos almacenados en base de datos.

* GET **http://localhost:3000/projects/id**: Obtiene el proyecto con el id enviado, si no existe, regresa un 404.

* POST **http://localhost:3000/projects**: Crea un proyecto con el siguiente body, se valida que los ids de usuarios enviados en el array existan y se insertan solo aquellos que existan
```
{
    "name": "Proyecto secreto 2",
    "description": "Es un proyecto secreto",
    "users": [9,13]
}
```

* PUT **http://localhost:3000/projects/id/**: Modifica el proyecto almacenado en base de datos que corresponda con el id enviado, si no existe el registro, regresa un 404.

```
{
    "name": "Proyecto secreto 2",
    "description": "Es un proyecto secreto",
    "users": [9,13]
}
```
* DELETE **http://localhost:3000/projects/id**: Elimina el proyecto almacenado en base de datos que corresponda con el id enviado, si no existe el registro, regresa un 404.  



**ORGANIZATIONAL UNITS**


* GET **http://localhost:3000/organizational-units/**: Obtiene todas las unidades almacenadas en base de datos.

* GET **http://localhost:3000/organizational-units/id**: Obtiene la unidad con el id enviado, si no existe, regresa un 404.

* POST **http://localhost:3000/organizational-units**: Crea una unidad con el siguiente body, se valida que los ids de usuarios enviados en el array y el id del proyecto, existan y se insertan solo aquellos que existen.
```
{
    "name": "Unidad 1",
    "project_id": 18,
    "users": [9, 11]
}
```

* PUT **http://localhost:3000/organizational-units/id/**: Modifica la unidad organizativa almacenada en base de datos que corresponda con el id enviado, si no existe el registro, regresa un 404.

```
{
    "name": "Unidad 1",
    "project_id": 18,
    "users": [9, 11]
}
```
* DELETE **http://localhost:3000/organizational-units/id**: Elimina la unidad almacenada en base de datos que corresponda con el id enviado, si no existe el registro, regresa un 404.



**VEHICLES**


* GET **http://localhost:3000/vehicles/**: Obtiene todos los vehiculos almacenadas en base de datos.

* GET **http://localhost:3000/vehicles/id**: Obtiene el vehiculo con el id enviado, si no existe, regresa un 404.

* POST **http://localhost:3000/vehicles**: Crea un vehiculo con el siguiente body:
```
{
    "plate": "TDH-84U",
    "service": "Toyota"
}
```

* PUT **http://localhost:3000/vehicles/id/**: Modifica el vehiculo almacenado en base de datos que corresponda con el id enviado, si no existe el registro, regresa un 404.

```
{
    "plate": "TDH-84U",
    "service": "Toyota"
}
```
* DELETE **http://localhost:3000/vehicles/id**: Elimina el vehiculo en base de datos que corresponda con el id enviado, si no existe el registro, regresa un 404.  

  

  

**TRANSFERS**


* GET **http://localhost:3000/transfers/**: Si el rol del usuario tiene el permiso *view_transfers*, obtiene las transferencias que el usuario autenticado puede ver (Sólo si el usuario autenticado está dentro del proyecto de la transferencia y si el usuario autenticado está dentro de la unidad organizativa solicitada), de lo contrario, regresa UnauthorizedRequest


* POST **http://localhost:3000/transfers**: Si el rol del usuario tiene el permiso *edit_transfers*, crea una transferencia con los datos enviados con el siguiente body: 
```
{
    "type": "trasfer A",
    "vehicle": 1,
    "client": 10,
    "transmitter": 9,
    "project": 18,
    "organizational_unit": 4
}
```
Se realizan validaciones de existencia del client, transmitter, project, organizational_unit y de pertenencia (usuario autenticado pertenece al proyecto y unidad organizativa especificada), de lo contrario regresa un BadRequest o UnauthorizedRequest

* PUT **http://localhost:3000/transfers/id/**: Si el rol del usuario tiene el permiso *edit_transfers*, se modifica la transferencia que corresponda con el id enviado, aplica la misma lógica del método POST

```
{
    "type": "trasfer A",
    "vehicle": 1,
    "client": 10,
    "transmitter": 9,
    "project": 18,
    "organizational_unit": 4
}
```
* DELETE **http://localhost:3000/transfers/id**: Si el rol del usuario tiene el permiso *delete_transfers*, se elimina la transferencia con el id enviado, solo si, el usuario pertenece a la unidad organizativa especificada, de lo contrario regresa UnauthorizedRequest.




** Notas: 
1. Todas las rutas están protegidas por token de autenticación a excepción de /auth/register , /auth/login y el CRUD de roles y permisos.
2. Se ha hecho uso de docker para levantar únicamente la base de datos postgresql y se tomaron las previsiones necesarias para crear la base de datos especificada en el archivo .env si no existe y generar las tablas.
3. Se ha hecho uso de guards para controlar únicamente el acceso a las rutas por token, rol y permisos (en el caso de /transfers). Estos se definen en la carpeta /src/auth.
4. Para facilitar las pruebas y debido a que estuve lidiando con un error en la construcción del Swagger que no pude resolver, se ha incluido en este repositorio una sencilla colección en Postman.
5. Se asumió que las restricciones de pertenencia del usuario autenticado con respecto a proyectos y unidades organizativas y de unidades organizativas con respecto a proyectos, podían hacerse como una validación dentro de las mismas rutas de /transfer


## Corriendo la api

```bash
$ chmod 700 run.sh 
$ ./run.sh

```