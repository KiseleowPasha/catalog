import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ICatalogProps } from '../../types/ptops';
import { Product } from '../product/product';

export const Catalog: React.FC<ICatalogProps> = ({ products }) => {
  const { value } = useSelector((state: RootState) => state.inputSearch);
  const currentProducts = products.filter((product) =>
    product.title.toLocaleLowerCase().includes(value.toLowerCase())
  );
  return (
    <div className='catalog'>
      {currentProducts.length === 0 ? (
        <h4>Товаров не найдено</h4>
      ) : (
        currentProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))
      )}
    </div>
  );
};
