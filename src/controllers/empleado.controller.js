import { EmployeeModel } from "../models/empleado.model.js";
import messages from "../utils/messages.js";
const { messageGeneral } = messages

const empleadoCtrl = {};
empleadoCtrl.createEmployee = async (req, res) => {
    try {
        const data = req.body;
        /* tconst resp = await EmployeeModel.create(data) */
        const resp = await EmployeeModel.create({...data,jefe:req.userid});
        messageGeneral(res, 201, true, resp, "empleado creado")
    } catch (error) {
        messageGeneral(res, 500, false, "", error, messages)
    }
}
empleadoCtrl.listById = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await EmployeeModel.findById(id);
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Empleado no encontrado");
        }
        messageGeneral(res, 200, true, resp, "");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

empleadoCtrl.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await EmployeeModel.findById(id);
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Empleado no encontrado");
        }
        await resp.deleteOne();
        messageGeneral(res, 200, true, "", "Empleado eliminado!!!");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

empleadoCtrl.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await EmployeeModel.findById(id);
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Empleado no encontrado");
        }
        await resp.updateOne(req.body);
        messageGeneral(res, 200, true, "", "Empleado actualizado!!!");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
//falta ccaptura
empleadoCtrl.listAllEmployees=async(req,res)=>{
    try {
      //hace el inner join con el usuario y que no muestre el password.
      const resp= await EmployeeModel.find().populate({ 
        path: "jefe",
        select: "-password"});
      messageGeneral(res,200,true,resp,"Lista de empleados");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };
  //falta ccaptura
  empleadoCtrl.listEmployeeBoss = async(req,res) =>{
    try {
     //const { id } = req.params;
     const resp = await EmployeeModel.find({ jefe:req.userid }).populate({
      path:"jefe",
      select:"-password"
     });
      messageGeneral(res,200,true,resp,"");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };
//falta ccaptura
  empleadoCtrl.searchEmployee = async(req,res) =>{
    try {
      const { nombres } = req.params;
      const resp = await EmployeeModel.find({
        nombres:{$regex: "." + nombres + "."},
        jefe: id,
      });
      messageGeneral(res,200,true,resp,"");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };
  
export default empleadoCtrl