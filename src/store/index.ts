import { applyMiddleware, combineReducers, createStore } from 'redux';
import { catalogReducer } from './reducers/catalogReducer';
import thunk from 'redux-thunk';
import { basketReducer } from './reducers/basketReducer';
import { inputSearchReducer } from './reducers/inputSearchReducer';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  basket: basketReducer,
  inputSearch: inputSearchReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
