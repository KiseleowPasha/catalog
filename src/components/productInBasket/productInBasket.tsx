import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  createActionChangeCountProductInBasket,
  createActionDeleteProductFromBasket,
} from '../../store/reducers/basketReducer';
import { IProductInBasket } from '../../types/basket';
import { IProductInBasketProps } from '../../types/ptops';

export const ProductInBasket: React.FC<IProductInBasketProps> = ({
  product,
}: IProductInBasketProps) => {
  const dispatch = useDispatch();

  const handlerChangeCountProductInBasket = (
    product: IProductInBasket,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    if (parseInt(event.target.value) === 0)
      handlerDeleteProductFromBasket(product.id, product);
    else {
      dispatch(
        createActionChangeCountProductInBasket(
          product,
          parseInt(event.target.value)
        )
      );
      fetch('/api/basket', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(product),
      });
    }
  };

  const handlerDeleteProductFromBasket = (
    id: number,
    product: IProductInBasket
  ): void => {
    fetch('/api/basket', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(product),
    })
      .then((response) =>
        response.status === 200
          ? dispatch(createActionDeleteProductFromBasket(id))
          : null
      )
      .catch((error: Error) => console.warn(error.message));
  };

  return (
    <div className='product-in-basket'>
      <img src={product.picture} alt='picture=product' width={100} />
      <span className="product-in-basket-title">{product.title}</span>
      <input
        type='number'
        defaultValue={product.count}
        onChange={(event: ChangeEvent<HTMLInputElement>): void =>
          handlerChangeCountProductInBasket(product, event)
        }
        min={1}
        autoFocus={true}
      />
      <span className="product-in-basket-price">{product.price * product.count}</span>
      <span onClick={() => handlerDeleteProductFromBasket(product.id, product)} className="product-in-basket-delete">
        Удалить
      </span>
    </div>
  );
};
