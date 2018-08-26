import actionTypes from '../consts/actionTypes';
import createReducer from './createReducer';

const reducers = {};

const defaultState = {};

reducers[actionTypes.constituent.CONSTITUENT_FETCH] = state => ({
  ...state,
  fetching: true,
});

reducers[actionTypes.constituent.CONSTITUENT_FETCH_SUCCESS] = (state, { bucketList, categories }) => ({
  ...state,
  fetching: false,
  bucketList,
  categories,
});

reducers[actionTypes.constituent.CONSTITUENT_WEIGHT_CHANGED] = (state, { id, weight }) => {
  const bucketList = [];
  state.bucketList.map((item) => {
    let newItem = item;
    if (item.id === id) {
      newItem = {
        ...item,
        editWeight: weight,
        changed: true,
      };
    }
    bucketList.push(newItem);
    return item;
  });
  return {
    ...state,
    bucketList,
  };
};

reducers[actionTypes.constituent.REBALANCE] = (state) => {
  const toChange = []; const locked = [];
  let toBalance = [];
  let changeSum = 0; let lockedSum = 0; let toBalanceSum = 0; let
    balance = 100;
  state.bucketList.map((item) => {
    const newItem = {
      ...item,
    };
    if (item.changed) {
      newItem.changed = false;
      toChange.push(newItem);
    } else if (item.locked) {
      locked.push(newItem);
    } else {
      toBalance.push(newItem);
    }
    return item;
  });

  changeSum = toChange.reduce(
    (acc, item) => acc + item.editWeight,
    changeSum,
  );

  lockedSum = locked.reduce(
    (acc, item) => acc + item.editWeight,
    lockedSum,
  );

  toBalanceSum = toBalance.reduce(
    (acc, item) => acc + item.editWeight,
    toBalanceSum,
  );

  balance -= (lockedSum + changeSum);

  toBalance = toBalance.map(item => ({
    ...item,
    editWeight: Math.round((
      (item.editWeight / toBalanceSum) * 100
        * balance
    )) / 100,
  }));
  return {
    ...state,
    bucketList: toChange.concat(locked).concat(toBalance).sort((c, n) => c.id - n.id),
  };
};

reducers[actionTypes.constituent.RESET] = (state) => {
  const bucketList = [];
  state.bucketList.map((item) => {
    bucketList.push({
      ...item,
      editWeight: undefined,
    });
    return null;
  });
  return {
    ...state,
    bucketList,
  };
};

reducers[actionTypes.constituent.DELETE] = (state, { id }) => {
  const bucketList = [];
  state.bucketList.map((item) => {
    const newItem = {
      ...item,
    };
    if (item.id === id) {
      return null;
    }
    bucketList.push(newItem);

    return null;
  });
  return {
    ...state,
    bucketList,
  };
};

reducers[actionTypes.constituent.TOGGLE_LOCK] = (state, { id, locked }) => {
  const bucketList = [];
  state.bucketList.map((item) => {
    const newItem = {
      ...item,
    };
    if (item.id === id) {
      newItem.locked = locked;
    }
    bucketList.push(newItem);
    return null;
  });
  return {
    ...state,
    bucketList,
  };
};

export default createReducer(reducers, defaultState);
