# Taller 3 Intro a Web Movil - Dashboard de Ventas.
### NextJS + Redux + Prisma + PostgreSQL
### Grupo 3
Integrantes:

1. Javier Dinamarca Fredes. 21.416.181-8 `javier.dinamarca@alumnos.ucn.cl	`
2. Pablo Jorquera Herrera. 21.545.563-7 `pablo.jorquera@alumnos.ucn.cl`
3. Maximiliano Pastén Nayem. 20.169.262-8 `maximiliano.pasten@alumnos.ucn.cl`
4. Vicente Ruiz Escobar. 21.464.046-5 `vicente.ruiz@alumnos.ucn.cl`

### Instalación de dependencias

- `Prisma`: npm install prisma@5 --save-dev
- `Redux`: npm install @reduxjs/toolkit react-redux
- `Graficos`: npm install chart.js react-chartjs-2
- `Generador de datos falsos`: npm install @faker-js/faker ts-node --save-dev

El proyecto incluye un .env de ejemplo donde se debe modificar las credenciales de la base de datos que estará vacía por defecto.
Para iniciar prisma ejecuta:
```
npx prisma migrate dev --name init
```
Para iniciar el proyecto en localhost:3000 ejecuta:
```
npm run build
npm run start
```

## Endpoints

| Método HTTP | Endpoint | Descripción | Body / Params |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/api/ventas` | Obtiene el listado completo de ventas almacenadas. | N/A |
| **`POST`** | `/api/ventas` | Crea un nuevo registro de venta en la base de datos. | JSON con datos (producto, monto, etc). |
| **`PUT`** | `/api/ventas/[id]` | Actualiza el estado o información de una venta existente. | **URL:** ID de la venta<br>**Body:** JSON con campos a editar. |
| **`DELETE`** | `/api/ventas/[id]` | Elimina permanentemente un registro de venta. | **URL:** ID de la venta. |

