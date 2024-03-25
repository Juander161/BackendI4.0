import { UserModel } from "../models/usuario.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import message from "../utils/messages.js";
const { messageGeneral } = message;

const userCtrl = {}
userCtrl.register = async (req, res) => {
    try {
        const data = req.body;
        //Verificar si el usuario ya esta dado de alta
        const resp = await UserModel.findOne({ correo: data.correo })
        if (resp) {
            return messageGeneral(res, 400, false, "", "el correo ya existe")
        }
        data.password = await bcrypt.hash(data.password, 10)
        const newUser = await UserModel.create(data)
        const token = jwt.sign({ _id: newUser._id }, "secreta")
        messageGeneral(res, 201, true, { ...newUser._doc, password: null, token },
            "el usuario se creo correctamente")
    } catch (error) {
        messageGeneral(res, 500, false, error.message, "Error al registrarse")
    }
}

userCtrl.login = async (req, res) => {
    try {
        const data = req.body;
        const resp = await UserModel.findOne({ correo: data.correo })
        if (!resp) {
            return messageGeneral(res, 400, false, "", "El correo no existe!");
        }
        const match = await bcrypt.compare(data.password, resp.password)
        if (match) {
            const token = jwt.sign({ _id: resp._id }, "secreta");
            return messageGeneral(res, 201, true, { ...resp._doc, password: null, token },
                "Bienvenido!!!");
        }
        messageGeneral(res, 400, false, "", "Contraseña incorrecta!")
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message)
    }
}


export default userCtrl