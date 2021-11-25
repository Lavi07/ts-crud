/* eslint-disable consistent-return */
/* eslint linebreak-style: ["error", "windows"] */
import express, { Request, Response } from 'express';
import * as customerModel from '../controllers/customer';
import { Customer } from '../models/customer';

const customerRouter = express.Router();
// Get All Customer Routes
customerRouter.get('/getAllCustomer', async (req: Request, res: Response) => {
  // get all customer data
  customerModel.findAll((err: Error, customer: Customer[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.status(200).json({ data: customer });
  });
});
// create customer routes
customerRouter.post('/createCustomer', async (req: Request, res: Response) => {
  const newCustomer: Customer = req.body;
  customerModel.create(newCustomer, (err: Error, customerId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ customerId });
  });
});

// get customer data by Id
customerRouter.get('/getCustomerById/:id', async (req: Request, res: Response) => {
  const customerId: number = Number(req.params.id);
  customerModel.findOne(customerId, (err: Error, customer: Customer) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (customer) res.status(200).json({ data: customer });
    else res.status(200).json({ msg: 'No user with this Id' });
  });
});

customerRouter.put(
  '/updateCustomer/:id',
  async (req: Request, res: Response) => {
    const customer: Customer = req.body;
    // eslint-disable-next-line radix
    customer.id = parseInt(req.params.id);
    customerModel.update(customer, (err: Error) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json({ message: 'Customer data updated successfully' });
    });
  },
);

// eslint-disable-next-line import/prefer-default-export
export { customerRouter };
