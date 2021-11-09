import { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../src/components/navbar/navbar';
import { ProductInBasket } from '../src/components/productInBasket/productInBasket';
import { RootState } from '../src/store';
import { fetchBasket } from '../src/store/reducers/basketReducer';

const Basket: NextPage = () => {
  const { products } = useSelector((state: RootState) => state.basket);
  const dispatch = useDispatch();
  let sum: number = 0;
  products.forEach((product) => (sum += product.count * product.price));
  useEffect(() => {
    dispatch(fetchBasket());
  }, []);
  return (
    <>
      <Navbar />
      <h1>Корзина</h1>
      {products.length === 0 ? (
        <h4>Здесь пока пусто...</h4>
      ) : (
        <div className='basket'>
          {products.map((product) => (
            <ProductInBasket key={product.id} product={product} />
          ))}
          <span className="total">Итого: {sum}</span>
        </div>
      )}
    </>
  );
};

export default Basket;
