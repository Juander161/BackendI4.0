import { OrderModel } from "../models/envio.model.js";
import messages from "../utils/messages.js";
const { messageGeneral } = messages;

const orderCtrl = {};

orderCtrl.createOrder = async (req, res) => {
    try {
        const newOrder = new OrderModel(req.body);
        const savedOrder = await newOrder.save();
        messageGeneral(res, 201, true, savedOrder, "Orden creada");
    } catch (error) {
        messageGeneral(res, 500, false, "", error, messages);
    }
}
orderCtrl.getOrderById = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) {
            messageGeneral(res, 404, false, "", "Orden no encontrada");
            return;
        }
        messageGeneral(res, 200, true, order, "Orden obtenida por ID");
    } catch (error) {
        messageGeneral(res, 500, false, "", error, messages);
    }
};

orderCtrl.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOrder) {
            messageGeneral(res, 404, false, "", "Orden no encontrada");
            return;
        }
        messageGeneral(res, 200, true, updatedOrder, "Orden actualizada");
    } catch (error) {
        messageGeneral(res, 500, false, "", error, messages);
    }
};

orderCtrl.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            messageGeneral(res, 404, false, "", "Orden no encontrada");
            return;
        }
        res.status(204).end();
    } catch (error) {
        messageGeneral(res, 500, false, "", error, messages);
    }
};

export default orderCtrl;
