// En servicio.route.js
import { Router } from "express";
import orderCtrl from "../controllers/envios.controller.js";

const route = Router();

// Rutas para las órdenes
route.post('/', orderCtrl.createOrder);
route.get('/listid/:id', orderCtrl.getOrderById);
route.put('/update/:id', orderCtrl.updateOrder);
route.delete('/delete/:id', orderCtrl.deleteOrder);

export default route;

