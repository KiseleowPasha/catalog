export interface IProductInBasket {
  title: string;
  count: number;
  price: number;
  picture: string;
  id: number;
}

export interface IBasketState {
  products: IProductInBasket[];
  loaded: boolean;
}

export enum BasketActions {
  LOAD_BASKET = 'LOAD_BASKET',
  ADD_PRODUCT_IN_BASKET = 'ADD_PRODUCT_IN_BASKET',
  CHANGE_COUNT_PRODUCT_IN_BASKET = 'CHANGE_COUNT_PRODUCT_IN_BASKET',
  DELETE_PRODUCT_FROM_BASKET = 'DELETE_PRODUCT_FROM_BASKET',
}

export type ActionBasket =
  | ActionLoadBasket
  | ActionAddProductInBasket
  | ActionChangeCountProductInBasket
  | ActionDeleteProductFromBasket;

interface ActionLoadBasket {
  type: BasketActions.LOAD_BASKET;
  payload: IProductInBasket[];
}

interface ActionAddProductInBasket {
  type: BasketActions.ADD_PRODUCT_IN_BASKET;
  payload: IProductInBasket;
}

interface ActionChangeCountProductInBasket {
  type: BasketActions.CHANGE_COUNT_PRODUCT_IN_BASKET;
  payload: {
    product: IProductInBasket;
    count: number;
  };
}

interface ActionDeleteProductFromBasket {
  type: BasketActions.DELETE_PRODUCT_FROM_BASKET;
  payload: number;
}
