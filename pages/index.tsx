import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Navbar } from '../src/components/navbar/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalog } from '../src/store/reducers/catalogReducer';
import { RootState } from '../src/store';
import { Catalog } from '../src/components/catalog/catalog';
import { fetchBasket } from '../src/store/reducers/basketReducer';
import { InputSearch } from '../src/components/inputSearch/inputSearch';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { loaded, products } = useSelector((state: RootState) => state.catalog);
  useEffect((): any => {
    dispatch(fetchCatalog());
    dispatch(fetchBasket());
  }, []);
  return (
    <>
      <Navbar />
      <div className='head'>
        <h1>Главная</h1>
        <InputSearch />
      </div>
      {loaded ? <Catalog products={products} /> : <h1>Загрузка...</h1>}
    </>
  );
};

export default Home;
