import mongoose from "mongoose";

const URI = "mongodb://127.0.0.1:27017/envios";

// Se crea la función de conexión 
const connectDB = async () => {
    try {
        const db = await mongoose.connect(URI);
        console.log("Base de datos conectada: ", db.connection.name);
    } catch (error) {  // Se añade el parámetro 'error' para capturar la información del error
        console.log("Error: ", error.message);
    }
}

export default connectDB;
