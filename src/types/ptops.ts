import { IProductInBasket } from './basket';
import { IProductInCatalog } from './catalog';

export interface ICatalogProps {
  products: IProductInCatalog[];
}

export interface IProductProps {
  product: IProductInCatalog;
}

export interface IProductInBasketProps {
  product: IProductInBasket;
}
