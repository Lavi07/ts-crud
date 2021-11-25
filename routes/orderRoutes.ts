import express, { Request, Response } from 'express';
import * as orderModel from '../controllers/order';
import { Order, BasicOrder } from '../models/order';

const orderRouter = express.Router();

orderRouter.get('/getAllOrder', async (req: Request, res: Response) => {
  // eslint-disable-next-line consistent-return
  orderModel.findAll((err: Error, orders: Order[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.status(200).json({ data: orders });
  });
});

orderRouter.post('/createOrder', async (req: Request, res: Response) => {
  const newOrder: BasicOrder = req.body;
  // eslint-disable-next-line consistent-return
  orderModel.create(newOrder, (err: Error, orderId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ orderId });
  });
});

orderRouter.get('/getOrderById/:id', async (req: Request, res: Response) => {
  const orderId: number = Number(req.params.id);
  // eslint-disable-next-line consistent-return
  orderModel.findOne(orderId, (err: Error, order: Order) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (order) res.status(200).json({ data: order });
    else res.status(200).json({ msg: 'No order with this Id' });
  });
});

orderRouter.put('/updateOrder/:id', async (req: Request, res: Response) => {
  const order: Order = req.body;
  // eslint-disable-next-line radix
  order.orderId = parseInt(req.params.id);
  // eslint-disable-next-line consistent-return
  orderModel.update(order, (err: Error) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: 'Updated order successfully' });
  });
});

// eslint-disable-next-line import/prefer-default-export
export { orderRouter };
