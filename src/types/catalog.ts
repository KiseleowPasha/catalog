export interface IProductInCatalog {
  id: number;
  title: string;
  picture: string;
  description: string;
  price: number;
  sale: boolean;
  category: string;
}

export interface ICatalogState {
  loaded: boolean;
  products: IProductInCatalog[];
}

export enum CatalogActions {
  LOAD_CATALOG = 'LOAD_CATALOG',
}

interface IActionLoadCatalog {
  type: CatalogActions.LOAD_CATALOG;
  payload: IProductInCatalog[];
}

export type ActionCatalog = IActionLoadCatalog;
