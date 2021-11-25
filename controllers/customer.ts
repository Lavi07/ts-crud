import { OkPacket, RowDataPacket } from 'mysql2';
import { Customer } from '../models/customer';
import { db } from '../connection/db';
import { tableName } from '../constant/tableName';

export const create = (user: Customer, callback: Function) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const queryString = `INSERT INTO ${tableName.customerTable} (name, password, email) VALUES (?, ?, ?)`;
    db.query(
      queryString,
      [user.name, user.password, user.email],
      (err, result) => {
        if (err) {
          callback(err);
        }

        const { insertId } = <OkPacket>result;
        callback(null, insertId);
      },
    );
  } catch (error) {
    throw error;
  }
};

export const findOne = (customerId: number, callback: Function) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const queryString = `
    SELECT * FROM ${tableName.customerTable} WHERE id=?`;

    db.query(queryString, customerId, (err, result) => {
      if (err) {
        callback(err);
      }

      const row = (<RowDataPacket>result)[0];
      callback(null, row);
    });
  } catch (error) {
    throw error;
  }
};

export const findAll = (callback: Function) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const queryString = `SELECT * from ${tableName.customerTable}`;

    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      }
      const rows = <RowDataPacket[]>result;
      callback(null, rows);
    });
  } catch (error) {
    throw error;
  }
};

export const update = (customer: Customer, callback: Function) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const queryString = `UPDATE ${tableName.customerTable} SET name=?,password=?,email=? WHERE id=?`;

    db.query(
      queryString,
      [customer.name, customer.password, customer.email, customer.id],
      (err) => {
        if (err) {
          callback(err);
        }
        callback(null);
      },
    );
  } catch (error) {
    throw error;
  }
};
