import { NextPage } from 'next';
import { Navbar } from '../src/components/navbar/navbar';
import { RootState } from '../src/store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCatalog } from '../src/store/reducers/catalogReducer';
import { Catalog } from '../src/components/catalog/catalog';
import { fetchBasket } from '../src/store/reducers/basketReducer';
import { InputSearch } from '../src/components/inputSearch/inputSearch';

const Tv: NextPage = () => {
  const { products } = useSelector((state: RootState) => state.catalog);
  const dispatch = useDispatch();
  const currentProducts = products.filter(
    (product) => product.category === 'tv'
  );
  useEffect((): any => {
    dispatch(fetchCatalog());
    dispatch(fetchBasket());
  }, []);
  return (
    <>
      <Navbar />
      <div className='head'>
        <h1>Телевизоры</h1>
        <InputSearch />
      </div>
      <Catalog products={currentProducts} />
    </>
  );
};

export default Tv;
