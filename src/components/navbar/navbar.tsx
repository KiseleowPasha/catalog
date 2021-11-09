import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
export const Navbar: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.basket);
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link href='/'>
            <a>Главная</a>
          </Link>
        </li>
        <li>
          <Link href='/tv'>
            <a>Телевизоры</a>
          </Link>
        </li>
        <li>
          <Link href='/notebooks'>
            <a>Ноутбуки</a>
          </Link>
        </li>
        <li>
          <Link href='/smartphones'>
            <a>Смартфоны</a>
          </Link>
        </li>
        <li>
          <Link href='/refrigerators'>
            <a>Холодильники</a>
          </Link>
        </li>
        <li className='basket-li'>
          <Link href='/basket'>
            <a>Корзина</a>
          </Link>
          <div className='count-in-basket'>{products.length}</div>
        </li>
      </ul>
    </nav>
  );
};
