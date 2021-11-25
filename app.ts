import * as dotenv from 'dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';
import { orderRouter } from './routes/orderRoutes';
import { customerRouter } from './routes/customerRoutes';
import { productRouter } from './routes/productRoutes';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use('/orders/api/', orderRouter);
app.use('/customer/api/', customerRouter);
app.use('/product/api/', productRouter);

app.listen(process.env.PORT, () => {
  console.log('Node server started running');
});
