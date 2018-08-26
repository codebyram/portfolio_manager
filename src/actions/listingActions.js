import actionTypes from '../consts/actionTypes';

import data from './data';

const listingActions = dispatch => ({
  fetchListing: () => {
    dispatch({ type: actionTypes.portfolio.PORTFOLIO_FETCH });

    const listing = [];

    data.map((portfolio) => {
      const {
        id, name, mean_return, volatility, currency,
      } = portfolio;
      listing.push({
        id, name, mean_return, volatility, currency,
      });
      return portfolio;
    });
    dispatch({ type: actionTypes.portfolio.PORTFOLIO_FETCH_SUCCESS, payload: { listing } });
  },
});

export default listingActions;
