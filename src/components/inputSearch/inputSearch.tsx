import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createActionChangeValueInInputSearch } from '../../store/reducers/inputSearchReducer';

export const InputSearch: React.FC = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((state: RootState) => state.inputSearch);

  const handlerChangeValueInInputSearch = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(createActionChangeValueInInputSearch(event.target.value));
  };

  return (
    <input
      type='text'
      value={value}
      onChange={handlerChangeValueInInputSearch}
      placeholder={"Введите название товара"}
    />
  );
};
