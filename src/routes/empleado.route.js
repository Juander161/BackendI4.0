import { Router } from "express";
import empleadoCtrl from "../controllers/empleado.controller.js";


const route=Router();
import { verificarToken } from "../middiewares/Auth.js";

route.post('/',verificarToken,empleadoCtrl.createEmployee)

//falta ccaptura
route.get('/',empleadoCtrl.listAllEmployees)
route.get('/listid/:id',verificarToken, empleadoCtrl.listById)
route.delete('/delete/:id',verificarToken, empleadoCtrl.deleteEmployee)
route.put('/update/:id' ,verificarToken, empleadoCtrl.updateEmployee)
//falta ccaptura
route.get('/listboss/',verificarToken, empleadoCtrl.listEmployeeBoss)
//falta ccaptura
route.get('/search/:nombres',verificarToken, empleadoCtrl.searchEmployee)
export default route

