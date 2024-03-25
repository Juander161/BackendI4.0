import mongoose from "mongoose";

const { Schema, model } = mongoose;
const enviosPermitidos = ["local", "nacional", "eua", "canada"];
const orderSchema = new Schema(
    {
        folio: { type: String, required: true },
        fecha: { type: Date, default: Date.now },
        nombreCliente: { type: String, required: true },
        telefono: { type: String, required: true },
        correo: { type: String, required: true },
        genero: { type: String, required: true },
        edad: { type: Number, required: true },
        idEmpleado: {type :Schema.ObjectId,ref:"empleado"},
        envioSeleccionado: { type: String, enum: enviosPermitidos, required: true },
        monto: { type: Number, required: true },
        fechaEntrega: { type: Date, default: Date.now },
        pago: { type: Number, required: true },
        saldo: { type: Number, required: true },
        destinatario: { type: String, required: true },
        direccion: { type: String, required: true },
        id: { type: String, required: true },
    },
    { timestamps: true }
);

export const OrderModel = model("orden", orderSchema);
