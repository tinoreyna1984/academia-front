# Academia frontend

## Requisitos
Levantar el backend: https://github.com/tinoreyna1984/academia

## Dependencias empleadas
* @angular/material, v16.2.12
* bootstrap, v5.3.2
* jquery, v3.7.1
* @popperjs/core, v2.11.8
* jwt-decode, v3.1.2
* sweetalert2, v11.9.0

## Instalación y ejecución
```bash
cd academia-front
npm i
ng serve -o
```

## Login de prueba (par usuario/clave)
* admin/Tr20010878 (administrador)
* treyna/u$uari0CRM (usuario)

## Instrucciones de uso

1. Inicio de sesión

![sc01](src/assets/screenshots/sc01.png "Pantalla principal")

2. Ingresar datos y hacer click en "Ingresar"

![sc02](src/assets/screenshots/sc02.png "Ingreso de datos")

3. Se entra al sistema. La pantalla principal es la de Aulas. Cabe destacar que el usuario solo puede leer la información registrada, de modo que la modificación de los datos vía CRUD está restringida a los administradores:

![sc03](src/assets/screenshots/sc03.png "Acceso como admininstrador")

![sc04](src/assets/screenshots/sc04.png "Acceso como usuario")

Se agrega también que la gestión de usuarios también está restringida a los administradores.

4. Se pueden visualizar, en el caso de las aulas, los valores relacionados de Profesor y Materia:

![sc05](src/assets/screenshots/sc05.png "Valores relacionados")

5. Los administradores pueden agregar, modificar y eliminar registros de todas las entidades del sistema:

Agregar:

![sc06](src/assets/screenshots/sc06.png "Agregar")
![sc07](src/assets/screenshots/sc07.png "Agregar")
![sc07-1](src/assets/screenshots/sc07-1.png "Agregar")

Modificar:

![sc08](src/assets/screenshots/sc08.png "Modificar")
![sc09](src/assets/screenshots/sc09.png "Modificar")

Eliminar:

![sc10](src/assets/screenshots/sc10.png "Eliminar")
![sc11](src/assets/screenshots/sc11.png "Eliminar")

## Casos particulares

Cuando ocurre un problema de ingreso de valores, se disparan mensajes de error. Por ejemplo, al ingresar mal las credenciales:

![sc12](src/assets/screenshots/sc12.png "Bad credentials")

Y después de tres reintentos la cuenta se bloquea:

![sc13](src/assets/screenshots/sc13.png "Account is locked")


