import actionTypes from '../consts/actionTypes';
import createReducer from './createReducer';

const reducers = {};

const defaultState = {};

reducers[actionTypes.portfolio.PORTFOLIO_FETCH] = state => ({
  ...state,
  fetching: true,
});

reducers[actionTypes.portfolio.PORTFOLIO_FETCH_SUCCESS] = (state, { listing }) => ({
  ...state,
  fetching: false,
  listing,
});

export default createReducer(reducers, defaultState);
