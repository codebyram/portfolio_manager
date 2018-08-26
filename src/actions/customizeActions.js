import actionTypes from '../consts/actionTypes';

import data from './data';

const customizeActions = dispatch => ({
  fetchConstituents: () => {
    dispatch({ type: actionTypes.constituent.CONSTITUENT_FETCH });
    const bucketList = [];
    const categories = [];

    data.map((portfolio) => {
      const { constituents } = portfolio;
      constituents.map((constituent) => {
        const { weight, instrument: { id, name, type } } = constituent;
        const item = {
          id,
          weight,
          name,
          type,
        };
        if (categories.indexOf(type) < 0) {
          categories.push(type);
        }
        bucketList.push(item);
        return constituent;
      });
      return portfolio;
    });

    dispatch({ type: actionTypes.constituent.CONSTITUENT_FETCH_SUCCESS, payload: { bucketList, categories } });
  },

  weightChanged: (id, weight) => {
    dispatch({ type: actionTypes.constituent.CONSTITUENT_WEIGHT_CHANGED, payload: { id, weight } });
  },

  rebalance: () => {
    dispatch({ type: actionTypes.constituent.REBALANCE });
  },

  reset: () => {
    dispatch({ type: actionTypes.constituent.RESET });
  },

  delete: (id) => {
    dispatch({ type: actionTypes.constituent.DELETE, payload: { id } });
  },

  toggleLock: (id, locked) => {
    dispatch({ type: actionTypes.constituent.TOGGLE_LOCK, payload: { id, locked } });
  },
});

export default customizeActions;
