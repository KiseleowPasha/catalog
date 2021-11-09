import { Application, Request, Response } from 'express';
import { IProductInBasket } from '../src/types/basket';

const express = require('express');
const next = require('next');
const path = require('path');
const urlencodedParser = express.urlencoded({ extended: false });
const fs = require('fs');

const port = 3000

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const DB_PATH = path.resolve(__dirname, './db');
const CATALOG_FILE = path.resolve(DB_PATH, 'catalog.json');
const BASKET_FILE = path.resolve(DB_PATH, 'basket.json');

app.prepare().then(() => {
  const server: Application = express();
  server.use(express.static(DB_PATH));
  server.use(express.json());

  server.post(
    '/api/basket',
    urlencodedParser,
    (req: Request, res: Response): void => {
      const productsInBasket: IProductInBasket[] = JSON.parse(
        fs.readFileSync(BASKET_FILE, 'utf-8')
      );
      productsInBasket.push(req.body);
      fs.writeFile(
        BASKET_FILE,
        JSON.stringify(productsInBasket),
        (err: Error): void => {
          if (err) throw err;
        }
      );
      res.sendStatus(200);
    }
  );

  server.delete(
    '/api/basket',
    urlencodedParser,
    (req: Request, res: Response): void => {
      const productsInBasket: IProductInBasket[] = JSON.parse(
        fs.readFileSync(BASKET_FILE, 'utf-8')
      );
      const newBasket = productsInBasket.filter(
        (product) => product.id !== req.body.id
      );
      fs.writeFile(
        BASKET_FILE,
        JSON.stringify(newBasket),
        (err: Error): void => {
          if (err) throw err;
        }
      );
      res.sendStatus(200);
    }
  );

  server.put(
    '/api/basket',
    urlencodedParser,
    (req: Request, res: Response): void => {
      const productsInBasket: IProductInBasket[] = JSON.parse(
        fs.readFileSync(BASKET_FILE, 'utf-8')
      );
      const currentProduct: IProductInBasket | undefined =
        productsInBasket.find((product) => product.id === req.body.id);
      if (currentProduct) currentProduct.count = req.body.count;
      fs.writeFile(
        BASKET_FILE,
        JSON.stringify(productsInBasket),
        (err: Error): void => {
          if (err) throw err;
        }
      );
      res.sendStatus(200);
    }
  );

  server.get('/api/basket', (req: Request, res: Response): void => {
    res.sendFile(BASKET_FILE);
  });

  server.get('/api/catalog', (req: Request, res: Response): void => {
    res.sendFile(CATALOG_FILE);
  });

  server.all('*', (req: Request, res: Response): void => {
    return handle(req, res);
  });

  server.listen(port, (): void => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
