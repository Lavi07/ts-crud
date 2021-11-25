/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express, { Request, Response } from 'express';
import * as productModel from '../controllers/product';
import { Product } from '../models/product';

const productRouter = express.Router();

// Get All Product Routes
productRouter.get('/getAllProduct', async (req: Request, res: Response) => {
  // get all product data
  // eslint-disable-next-line consistent-return
  productModel.findAll((err: Error, product: Product[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.status(200).json({ data: product });
  });
});

// create product routes
productRouter.post('/createProduct', async (req: Request, res: Response) => {
  const newProduct: Product = req.body;
  // eslint-disable-next-line consistent-return
  productModel.create(newProduct, (err: Error, productId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ productId });
  });
});

// get product data by Id
productRouter.get('/getProductById/:id', async (req: Request, res: Response) => {
  const productId: number = Number(req.params.id);
  // eslint-disable-next-line consistent-return
  productModel.findOne(productId, (err: Error, product: Product) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (product) res.status(200).json({ data: product });
    else res.status(200).json({ msg: 'No user with this Id' });
  });
});

productRouter.put('/updateProduct/:id', async (req: Request, res: Response) => {
  const product: Product = req.body;
  // eslint-disable-next-line radix
  product.id = parseInt(req.params.id);

  // eslint-disable-next-line consistent-return
  productModel.update(product, (err: Error) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Updated Product Successfully' });
  });
});

// eslint-disable-next-line import/prefer-default-export
export { productRouter };
