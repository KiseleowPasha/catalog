import {
  ICatalogState,
  ActionCatalog,
  CatalogActions,
  IProductInCatalog,
} from '../../types/catalog';
import { Dispatch } from 'redux';

const localState: ICatalogState = {
  loaded: false,
  products: [],
};

export const catalogReducer = (
  state = localState,
  action: ActionCatalog
): ICatalogState => {
  switch (action.type) {
    case CatalogActions.LOAD_CATALOG:
      return { ...state, products: [...action.payload], loaded: true };
    default:
      return state;
  }
};

const createActionLoadCatalog = (
  products: IProductInCatalog[]
): ActionCatalog => {
  return {
    type: CatalogActions.LOAD_CATALOG,
    payload: products,
  };
};

export const fetchCatalog = () => {
  return (dispatch: Dispatch<ActionCatalog>) => {
    fetch('/api/catalog')
      .then((resolve) => resolve.json())
      .then((products: IProductInCatalog[]) =>
        dispatch(createActionLoadCatalog(products))
      );
  };
};
