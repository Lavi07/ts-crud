import { OkPacket, RowDataPacket } from 'mysql2';
import { Product } from '../models/product';
import { db } from '../connection/db';
import { tableName } from '../constant/tableName';

export const create = (product: Product, callback: Function) => {
  const queryString = `INSERT INTO ${tableName.productTable} (name, price, description, instock_quantity) VALUES (?, ?, ?, ?)`;
  db.query(
    queryString,
    [
      product.name,
      product.price,
      product.description,
      product.instockQuantity,
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      const { insertId } = <OkPacket>result;
      callback(null, insertId);
    },
  );
};

export const findOne = (productId: number, callback: Function) => {
  const queryString = `SELECT * FROM ${tableName.productTable} WHERE id=?`;

  db.query(queryString, productId, (err, result) => {
    if (err) {
      callback(err);
    }
    const row = (<RowDataPacket>result)[0];
    callback(null, row);
  });
};

export const update = (product: Product, callback: Function) => {
  const queryString = `UPDATE ${tableName.productTable} SET name=?,price=?,description=?,instock_quantity=? WHERE id=?`;

  db.query(
    queryString,
    [
      product.name,
      product.price,
      product.description,
      product.instockQuantity,
      product.id,
    ],
    (err) => {
      if (err) {
        callback(err);
      }
      callback(null);
    },
  );
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * from ${tableName.productTable}`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }
    const rows = <RowDataPacket[]>result;
    callback(null, rows);
  });
};
