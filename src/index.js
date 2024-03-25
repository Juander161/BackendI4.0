// Forma anterior para agregar los paquetes.
// express = require('express');
// Forma actual para agregar los paquetes
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './database.js';
connectDB();
import employeeRoute from './routes/empleado.route.js';
import serviceRoute from './routes/servicio.route.js';
import userRoute from './routes/usuario.route.js';


// Se crea una variable con la funcionalidad de express 
const app = express();

// Se crea el puerto por el que va a escuchar el servidor 
app.set('Port', 4000);

// Se agrega morgan para visualizar las peticiones del backend en consola
app.use(morgan('dev'));

// Establecer las respuestas del servidor en formato JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Para poder recibir peticiones, no solo de una dirección IP
app.use(cors({ origin: '*' }));
// se garega la ruta del usuario

// se garega la ruta del empleado
app.use('/api', userRoute);
app.use('/api/employee', employeeRoute);
app.use('/api/service', serviceRoute);

// Función para correr el servidor 
app.listen(app.get('Port'), () => {
    console.log('Servidor escuchando por el puerto: ', app.get('Port'));
});

