import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createActionAddProductInBasket } from '../../store/reducers/basketReducer';
import { IProductInBasket } from '../../types/basket';
import { IProductInCatalog } from '../../types/catalog';
import { IProductProps } from '../../types/ptops';
import Link from 'next/link';

export const Product: React.FC<IProductProps> = ({
  product,
}: IProductProps) => {
  const dispatch = useDispatch();
  const productsInBasket = useSelector(
    (state: RootState) => state.basket.products
  );
  const hasBasketCurrentProduct = productsInBasket.find(
    (productInBasket) => productInBasket.id === product.id
  )
    ? true
    : false;
  const handlerAddProductInBAsket = (product: IProductInCatalog): void => {
    const addedProduct: IProductInBasket = {
      count: 1,
      title: product.title,
      picture: product.picture,
      price: product.price,
      id: product.id,
    };
    fetch('/api/basket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(addedProduct),
    })
      .then((response) =>
        response.status === 200
          ? dispatch(createActionAddProductInBasket(addedProduct))
          : null
      )
      .catch((err: Error) => console.warn(err.message));
  };
  return (
    <div className='product'>
      <img src={product.picture} alt='picture_in_card' width={100} />
      <span>{product.title}</span>
      <span>{product.price}</span>
      {hasBasketCurrentProduct ? (
        <Link href={'/basket'}>
          <a className='added'>Перейти в корзину</a>
        </Link>
      ) : (
        <button onClick={() => handlerAddProductInBAsket(product)}>
          Добавить в корзину
        </button>
      )}
    </div>
  );
};
