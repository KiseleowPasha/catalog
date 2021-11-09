import { Dispatch } from 'redux';
import {
  ActionBasket,
  IBasketState,
  BasketActions,
  IProductInBasket,
} from '../../types/basket';

const localState: IBasketState = {
  products: [],
  loaded: false,
};

export const basketReducer = (
  state = localState,
  action: ActionBasket
): IBasketState => {
  switch (action.type) {
    case BasketActions.LOAD_BASKET:
      return { ...state, products: [...action.payload], loaded: true };

    case BasketActions.ADD_PRODUCT_IN_BASKET:
      return { ...state, products: [...state.products, action.payload] };

    case BasketActions.CHANGE_COUNT_PRODUCT_IN_BASKET: {
      const currentProduct = state.products.find(
        (product) => product.id === action.payload.product.id
      );
      if (currentProduct) currentProduct.count = action.payload.count;
      return { ...state };
    }

    case BasketActions.DELETE_PRODUCT_FROM_BASKET:
      return {
        ...state,
        products: [
          ...state.products.filter((product) => product.id !== action.payload),
        ],
      };

    default:
      return state;
  }
};

const createActionLoadBasket = (products: IProductInBasket[]): ActionBasket => {
  return {
    type: BasketActions.LOAD_BASKET,
    payload: products,
  };
};

export const fetchBasket = () => {
  return (dispatch: Dispatch<ActionBasket>) => {
    fetch('/api/basket')
      .then((response) => response.json())
      .then((products: IProductInBasket[]) =>
        dispatch(createActionLoadBasket(products))
      );
  };
};

export const createActionAddProductInBasket = (
  product: IProductInBasket
): ActionBasket => {
  return {
    type: BasketActions.ADD_PRODUCT_IN_BASKET,
    payload: product,
  };
};

export const createActionChangeCountProductInBasket = (
  product: IProductInBasket,
  count: number
): ActionBasket => {
  return {
    type: BasketActions.CHANGE_COUNT_PRODUCT_IN_BASKET,
    payload: {
      count: count,
      product: product,
    },
  };
};

export const createActionDeleteProductFromBasket = (
  id: number
): ActionBasket => {
  return {
    type: BasketActions.DELETE_PRODUCT_FROM_BASKET,
    payload: id,
  };
};
