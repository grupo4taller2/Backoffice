# Backoffice Fiuber (Taller de programacion 2, grupo 4)

Esta es la aplicacion web para administradores de la aplicacion Fiuber, desarrollada por el grupo 4 de la materia taller de programacion 2 durante el segundo cuatrimestre de 2022.

## Levantar el ambiente de forma local

Para levantar el ambiente de forma local, se deben correr los siguientes comandos:

```bash

>>> npm install
>>> npm start

```

## Aplicacion en la nube

El backoffice se encuentra disponible en la siguiente url: https://fiuberg4.onrender.com

La aplicacion, se encuentra hosteada en render (render.com) en un contenedor de docker.

---

## Funcionalidades de la aplicacion


### Login adminisitradores

Los administradores pueden ingresar al backoffice utilizando:

1. Email y contraseña
2. Google como proveedor de identidad federada

![](./readmeImages/Screenshot%20from%202022-12-07%2014-58-59.png)

---

### Busqueda de usuarios

Los administradores pueden buscar a los usuarios del sistema segun su nombre de usuario. Pudiendo ademas, ver los datos de los mismos.

![](./readmeImages/Screenshot%20from%202022-12-07%2015-03-28.png)

![](./readmeImages/Screenshot%20from%202022-12-07%2015-05-25.png)

---

### Registro de administradores

Asimismo, los administradores pueden registrar a nuevos usuarios como administradores del sistema, pudiendo hacer esto mismo directamente desde la misma pantalla de busqueda de usuarios.

---

### Carga de saldo

Los administradores, pueden cargar saldo a los usuarios que lo requieran debido a diferentes causas.

![](./readmeImages/Screenshot%20from%202022-12-07%2015-08-44.png)

---

### Modificacion de reglas de cotizacion

Desde el backoffice, los administradores pueden modificar las reglas de cotizacion de viajes, asi como tambien probar las mismas para asegurarse que la correctitud de las mismas.

![](./readmeImages/Screenshot%20from%202022-12-07%2015-11-16.png)

---

### Metricas de usuarios

Los administradores tienen la posibilidad de ver 3 metricas distintas acerca de los usuarios del sistema.

1. Total de usuarios que ingresaron a la plataforma durante las ultimsa 24 horas (segregado por tipo de login (federado vs. Email y contraseña))

2. Total de usuarios activos durante las ultimas 24 horas, segregado por cada hora y por tipo de usuario (driver vs rider)

3. Total de nuevos usuarios durante las ultimas 24 horas (segregado por metodo de registro (federado vs. email y contraseña))

![](./readmeImages/Screenshot%20from%202022-12-14%2014-56-20.png)

---

### Metricas de viajes

Asimismo, los administradores tienen disponibles 3 metricas diferentes para los viajes realizados con la plataforma.

1. Cantidad de conductores segun su frecuencia de viajes realizados (menos de 3, menos de 9 y mas de 9) durante las ultimas 24 horas.

2. Cantidad de pasajeros segun su frecuencia de viajes realizados (menos de 3, menos de 9, mas de 9) durante las ultimas 24 horas.

3. Cantidad de viajes segun su rango de distancia (menos de 5km, menos de 10km y mas de 10km) durante las ultimas 24 horas.

![](./readmeImages/Screenshot%20from%202022-12-14%2014-56-25.png)
---

### Metricas de transacciones

Finalmente, los administradores tienen disponible la siguiente metrica de transacciones

1. Retiros realizados durante las ultimas 24 horas de la plataforma contra los pagos hechos durante esa misma ventana de tiempo.

![](./readmeImages/Screenshot%20from%202022-12-14%2014-56-31.png)

---

### Listado de transacciones

Desde el backoffice, los administradores pueden acceder a todas las transacciones realizadas mediante la plataforma. 

![](./readmeImages/Screenshot%20from%202022-12-07%2015-19-06.png)